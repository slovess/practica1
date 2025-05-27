"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '@/Components/Header';
import TransactionForm from '../Components/TransactionForm';
import AnalyticsChart from '../Components/AnalyticsChart';

const AnalyticsDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const handleDateChange = async (e) => {
    const selected = e.target.value;
    try {
      const response = await axios.get(`/transactions?date=${selected}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="dashboard">
      <Header isFooter={false} />
      <main className="main-content">
        <h1 className="dashboard-title">МОЯ АНАЛИТИКА</h1>
        <section className="analytics-container">
          <TransactionForm />
          <AnalyticsChart />
        </section>
        <div className="history-section">
          <h2 className="history-title">История транзакций</h2>
          <input type="date" onChange={handleDateChange} />
          <div className="history-container">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="day-group">
                <h3 className="day-title">{new Date(transaction.date).toLocaleDateString()}</h3>
                <div className="transaction-row">
                  <span className="category">{transaction.category}</span>
                  <span className={`amount ${transaction.type === 'income' ? 'income' : ''}`}>
                    {transaction.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Header isFooter={true} />
      <style jsx="true">{`
           .dashboard {
          display: flex;
          flex-direction: column;
          min-height: screen;
          background-color: #fff;
          font-family: Roboto Condensed;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
        }
        .dashboard-title {
          color: #0b56f9;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 32px;
        }
        .analytics-container {
          display: flex;
          gap: 32px;
        }
        @media (max-width: 991px) {
          .analytics-container {
            flex-direction: column;
          }
        }
        @media (max-width: 640px) {
          .main-content {
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnalyticsDashboard;