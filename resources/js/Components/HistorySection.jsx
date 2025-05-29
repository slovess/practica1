import { useState, useEffect } from 'react';
import axios from 'axios';

const HistorySection = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка всех транзакций при монтировании
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Фильтрация транзакций при изменении даты
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchTransactions(date);
  };

  const fetchTransactions = async (date = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {};
      if (date) {
        params.date = date; // Фильтрация по конкретной дате
      }

      const response = await axios.get('/transactions', { params });

      // Группировка транзакций по дате
      const grouped = response.data.reduce((acc, transaction) => {
        const dateKey = new Date(transaction.date).toLocaleDateString();
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);
        return acc;
      }, {});

      setTransactions(grouped);
    } catch (err) {
      console.error('Ошибка загрузки транзакций:', err);
      setError('Не удалось загрузить историю транзакций');
    } finally {
      setIsLoading(false);
    }
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
          onChange={handleDateChange}
        />
        {selectedDate && (
          <button
            className="clear-filter"
            onClick={() => {
              setSelectedDate('');
              fetchTransactions();
            }}
          >
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
            Object.entries(transactions).map(([date, transactionsForDate]) => (
              <div key={date} className="day-group">
                <h3 className="day-title">{date}</h3>
                {transactionsForDate.map((transaction) => (
                  <div key={transaction.id} className="transaction-row">
                    <span className="category">
                      {transaction.category?.name || 'Без категории'}
                    </span>
                    <span className={`amount ${transaction.type === 'income' ? 'income' : 'expense'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {Math.abs(transaction.amount).toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="description">
                      {transaction.description}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="no-transactions">Нет транзакций за выбранный период</div>
          )}
        </div>
      )}

      <style jsx>{`
        .history-section {
          margin-top: 32px;
        font-family: Roboto Condensed;
          padding: 20px;
          width:1370px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .history-title {
           font-size: 24px;
          font-weight: 600;
          color: #0b56f9;
        text-align:center;
        }

        .date-filter {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .date-filter input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .clear-filter {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          text-decoration: underline;
        }

        .history-container {
          max-height: 500px;
          overflow-y: auto;
        }

        .day-group {
          margin-bottom: 20px;
        }

        .day-title {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }

        .transaction-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          margin-bottom: 8px;
          background: #f9f9f9;
          border-radius: 4px;
        }

        .category {
          flex: 2;
          font-weight: 500;
        }

        .amount {
          flex: 1;
          text-align: right;
          font-weight: bold;
        }

        .amount.income {
          color: #2ecc71;
        }

        .amount.expense {
          color: #e74c3c;
        }

        .description {
          flex: 3;
          color: #666;
          font-size: 14px;
          padding-left: 15px;
        }

        .error-message {
          color: #e74c3c;
          padding: 10px;
          background: #ffebee;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .loading {
          text-align: center;
          padding: 20px;
          color: #666;
        }

        .no-transactions {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default HistorySection;