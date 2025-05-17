"use client";
import React from 'react';

const TransactionForm = () => {
  return (
    <section className="form-container">
      <h2 className="form-title">Расходы и Доходы</h2>
      <div className="button-group">
        <button className="action-button date-button">Выбор даты</button>
        <button className="action-button add-button">Добавить транзакцию</button>
      </div>
      <form className="transaction-form">
        <div className="form-field">
          <label className="form-label">Сумма</label>
          <input type="text" className="form-input" />
        </div>
        <div className="form-field">
          <label className="form-label">Категория</label>
          <select className="form-select" />
        </div>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" name="type" id="income" />
            <label htmlFor="income" className="form-label">Доход</label>
          </div>
          <div className="radio-option">
            <input type="radio" name="type" id="expense" defaultChecked />
            <label htmlFor="expense" className="form-label">Расход</label>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Дата</label>
          <input type="text" value="13/05/2025" className="form-input" />
        </div>
        <div className="form-field">
          <label className="form-label">Запись</label>
          <textarea className="form-textarea" />
        </div>
        <div className="form-actions">
          <button type="button" className="action-button delete-button">Удалить</button>
          <button type="button" className="action-button save-button">Сохранить</button>
        </div>
      </form>
      <style jsx>{`
        .form-container {
          width: 442px;
          border-radius: 5px;
          border: 1px solid #062057;
          background-color: #fff;
          padding: 24px;
        }
        .form-title {
          color: #0b56f9;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .button-group {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .action-button {
          padding: 4px 24px;
          border-radius: 5px;
          border: 1px solid #0b56f9;
          color: #0b56f9;
        }
        .date-button {
          background-color: #f5f5f5;
        }
        .add-button {
          background-color: rgba(206, 219, 249, 0.78);
        }
        .transaction-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          color: #0b56f9;
        }
        .form-input, .form-select {
          width: 100%;
          height: 25px;
          border-radius: 5px;
          border: 1px solid #0b56f9;
          background-color: #f5f5f5;
        }
        .form-textarea {
          width: 100%;
          height: 65px;
          border-radius: 5px;
          border: 1px solid #0b56f9;
          background-color: #f5f5f5;
        }
        .radio-group {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        .delete-button, .save-button {
          padding: 4px 32px;
          background-color: #f5f5f5;
        }
        @media (max-width: 991px) {
          .form-container {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default TransactionForm;
