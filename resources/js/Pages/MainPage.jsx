"use client";
import React from 'react';
import img from '../../../public/img/Città House.png'
import img1 from '../../../public/img/Group 32.png'
import img2 from '../../../public/img/Group 47.png'
import img3 from '../../../public/img/Group 48.png'
import img4 from '../../../public/img/Group 5.png'

import { Header } from '../Components/Header';
import { FinanceCard } from '../Components/FinanceCard';
import { AnalyticsSection } from '../Components/AnalyticsSection';
import { Footer } from '../Components/Footer';

const MainPage = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      
      <Header />

      <main className="main-container">


        <section className="content-section">
          <h1 className="main-title">ГЛАВНАЯ</h1>

          <div className="cards-grid">
            <FinanceCard
              title="Где хранить деньги"
              imageUrl={img}

            />
            <FinanceCard
              title="Валюты мира"
              imageUrl={img1}

            />
            <FinanceCard
              title="Дом или квартира?"
              imageUrl={img2}
            />
            <FinanceCard
              title="Думай и богатей"
              imageUrl={img3}
            />
            <FinanceCard
              title="Финансовая подушка"
              imageUrl={img4}
            />
          </div>

          <AnalyticsSection />
        </section>

        <Footer />
      </main>

      <style jsx>{`
        .main-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #fff;
        }

        .content-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }

        .main-title {
          color: #0b56f9;
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .cards-grid {
          display: flex;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        @media (max-width: 991px) {
          .cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .content-section {
            padding: 40px 10px;
          }

          .cards-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
};

export default MainPage;
