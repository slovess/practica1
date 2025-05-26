"use client";
import React from 'react';


import { Header } from '../Components/Header';
import { FinanceCard } from '../Components/FinanceCard';
import { AnalyticsSection } from '../Components/AnalyticsSection';
import { Footer } from '../Components/Footer';

const MainPage = ({ articles }) => {
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

                        {
                            articles.map(element => (
                                <a key={element.id} href={route('article.show', { id: element.id })}>
                                    <FinanceCard
                                        title={element.name}
                                        imageUrl={element.image}
                                    />
                                </a>
                            ))
                        }

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
