"use client";
import React from 'react';
import Header from './Header';
import TransactionForm from './TransactionForm';
import AnalyticsChart from './AnalyticsChart';
import TransactionHistory from './TransactionHistory';

const AnalyticsDashboard = () => {
  return (
    <div className="dashboard">
      <Header isFooter={false} />
      <main className="main-content">
        <h1 className="dashboard-title">МОЯ АНАЛИТИКА</h1>
        <section className="analytics-container">
          <TransactionForm />
          <AnalyticsChart />
        </section>
        <TransactionHistory />
      </main>
      <Header isFooter={true} />
      <style jsx>{`
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
