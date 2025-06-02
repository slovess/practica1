import React, { useState, useEffect } from 'react';
import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

const HistorySection = ({ selectedDate, onDateChange }) => {
  const [transactions, setTransactions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactions(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const fetchTransactions = async (date = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const params = date ? { date } : {};
      const response = await axios.get('/transactions', { params });

      // Группируем по дате (строкой, например "01.06.2025")
      const grouped = response.data.reduce((acc, transaction) => {
        const dateKey = new Date(transaction.date).toLocaleDateString('ru-RU');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(transaction);
        return acc;
      }, {});

      setTransactions(grouped);
    } catch (err) {
      setError('Не удалось загрузить историю транзакций');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить транзакцию?')) return;
    try {
      await axios.delete(`/transactions/${id}`);
      fetchTransactions(selectedDate);
    } catch (err) {
      alert('Ошибка удаления');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/transactions/${editingTransaction.id}`, editingTransaction);
      setEditingTransaction(null);
      fetchTransactions(selectedDate);
    } catch (err) {
      alert('Ошибка при обновлении транзакции');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTransaction({ ...editingTransaction, [name]: value });
  };

  return (
    <div className="history-section">
      <h2 className="history-title">История транзакций</h2>

      <div className="date-filter">
        <label htmlFor="transaction-date">Фильтр по дате:</label>
        <input
          type="date"
          id="transaction-date"
          value={selectedDate}
          onChange={onDateChange}
        />
        {selectedDate && (
          <button className="clear-filter" onClick={() => onDateChange({ target: { value: '' } })}>
            Сбросить фильтр
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="history-container">
          {Object.entries(transactions).length > 0 ? (
            Object.entries(transactions).map(([date, txns]) => (
              <div key={date} className="day-group">
                <h3 className="day-title">{date}</h3>
                {txns.map((txn) => (
                  <div key={txn.id} className="transaction-row">
                    <span className="category">{txn.category?.name || 'Без категории'}</span>
                    <span className={`amount ${txn.type}`}>
                      {txn.type === 'income' ? '+' : '-'}
                      {Math.abs(txn.amount).toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="description">{txn.description}</span>
                    <div>
                      <button onClick={() => setEditingTransaction(txn)}>✏️</button>
                      <button className="delete-btn" onClick={() => handleDelete(txn.id)}>✖</button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="no-transactions">Нет транзакций за выбранный период</div>
          )}
        </div>
      )}

      {}
      {editingTransaction && (
        <div className="modal">
          <form onSubmit={handleUpdate} className="edit-form">
            <h3>Редактировать транзакцию</h3>

            <select name="type" value={editingTransaction.type} onChange={handleEditChange} required>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>

            <input
              name="amount"
              type="number"
              value={editingTransaction.amount}
              onChange={handleEditChange}
              required
              min="0"
              step="0.01"
            />

            <input
              name="date"
              type="date"
              value={editingTransaction.date?.slice(0, 10)} // Формат YYYY-MM-DD
              onChange={handleEditChange}
              required
            />

            <select name="category_id" value={editingTransaction.category_id || ''} onChange={handleEditChange} required>
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <input
              name="description"
              type="text"
              value={editingTransaction.description || ''}
              onChange={handleEditChange}
              placeholder="Описание"
            />

            <div className="buttons">
              <button type="submit">Сохранить</button>
              <button type="button" onClick={() => setEditingTransaction(null)}>Отмена</button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        .history-section {
          width: 100%;
          margin-top: 32px;
          font-family: Roboto Condensed, sans-serif;
        }
        .history-title {
          color: #0b56f9;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
        }
        .date-filter {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }
        .date-filter input {
          padding: 6px 8px;
          font-size: 16px;
        }
        .clear-filter {
          background-color: #eee;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          color: #0b56f9;
          font-weight: 600;
        }
        .error-message {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
        .loading {
          text-align: center;
          font-size: 18px;
          margin: 20px 0;
        }
        .history-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .day-group {
          margin-bottom: 32px;
        }
        .day-title {
          color: #0b56f9;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          border-bottom: 2px solid #0b56f9;
          padding-bottom: 6px;
        }
        .transaction-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #ccc;
          align-items: center;
          gap: 12px;
        }
        .category {
          color: #0b56f9;
          font-size: 18px;
          flex: 2;
        }
        .amount {
          font-size: 18px;
          flex: 1;
          text-align: right;
        }
        .amount.income {
          color: #0bf927;
        }
        .amount.expense {
          color: #f90b0b;
        }
        .description {
          flex: 3;
          font-style: italic;
          color: #333;
        }
        .transaction-row > div {
          flex: 0 0 auto;
          display: flex;
          gap: 6px;
        }
        .transaction-row button {
          cursor: pointer;
          background: none;
          border: none;
          font-size: 20px;
          color: #0b56f9;
        }
        .transaction-row button.delete-btn {
          color: #f90b0b;
        }
        /* Модальное окно */
        .modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .edit-form {
          background: white;
          padding: 24px;
          border-radius: 8px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .edit-form select, .edit-form input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
        }
        .buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .buttons button[type="submit"] {
          background-color: #0b56f9;
          color: white;
        }
        .buttons button[type="button"] {
          background-color: #ccc;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default HistorySection;
