"use client";
import React, { useState } from 'react';
import { Header } from '@/Components/Header';
import TransactionForm from '../Components/TransactionForm';
import AnalyticsChart from '../Components/AnalyticsChart';
import HistorySection from '@/Components/HistorySection';
import { Head } from '@inertiajs/react';

const AnalyticsDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <>
    <Head title="МОЯ АНАЛИТИКА" />
    <div className="dashboard">
      <Header isFooter={false} />
      <main className="main-content">
        <h1 className="dashboard-title">МОЯ АНАЛИТИКА</h1>
        <section className="analytics-container">
          <TransactionForm />
          <AnalyticsChart />
        </section>
        <HistorySection selectedDate={selectedDate} onDateChange={handleDateChange} />
      </main>
      <Header isFooter={true} />
      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #fff;
          font-family: Roboto Condensed, sans-serif;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
          flex-grow: 1;
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
          margin-bottom: 40px;
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
    </>
  );
};

export default AnalyticsDashboard;
