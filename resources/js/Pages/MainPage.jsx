"use client";
import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';

import { Header } from '../Components/Header';
import { FinanceCard } from '../Components/FinanceCard';
import { AnalyticsSection } from '../Components/AnalyticsSection';
import { Footer } from '../Components/Footer';

const MainPage = ({ articles }) => {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';

    const [newArticle, setNewArticle] = useState({
        name: '',
        abstract: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const handleCreate = (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        const formData = new FormData();
        formData.append('name', newArticle.name);
        formData.append('abstract', newArticle.abstract);
        formData.append('description', newArticle.description);
        formData.append('image', imageFile);

        router.post(route('article.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setNewArticle({ name: '', abstract: '', description: '' });
                setImageFile(null);
            },
            onError: () => {
              
            }
        });
    };

    return (
        <>
        <Head title="ГЛАВНАЯ" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                rel="stylesheet"
            />

            <Header />

            <main className="main-container">
                <section className="content-section">
                    <h1 className="main-title">ГЛАВНАЯ</h1>

                    <div className="cards-grid">
                        {articles.map(element => (
                            <div key={element.id} className="card-wrapper">
                                <a href={route('article.show', { id: element.id })}>
                                    <FinanceCard
                                        title={element.name}
                                        imageUrl={element.image}
                                    />
                                </a>
                                {isAdmin && (
                                    <button onClick={() => {
                                        if (confirm('Удалить статью?')) {
                                            router.delete(route('article.destroy', element.id));
                                        }
                                    }} className="delete-btn-bottom">
                                        Удалить
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {isAdmin && (
                        <form onSubmit={handleCreate} className="form-create" encType="multipart/form-data">
                            <h2 className="form-title">Добавить статью</h2>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newArticle.name}
                                onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Краткое описание"
                                value={newArticle.abstract}
                                onChange={(e) => setNewArticle({ ...newArticle, abstract: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Описание"
                                value={newArticle.description}
                                onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                required
                            />
                            <button type="submit">Создать</button>
                        </form>
                    )}

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

                .form-create {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                    max-width: 500px;
                    margin-bottom: 40px;
                    background: #f4f4f4;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    margin-top:30px;
                }

                .form-create input,
                .form-create textarea {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-family: 'Roboto Condensed', sans-serif;
                }

                .form-create button {
                    background-color: #0b56f9;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .cards-grid {
                    display:flex;
                    gap:30px;
                    flex-wrap: wrap;
                    margin-bottom:50px;
                }

                .card-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    gap: 10px;
                }

                .delete-btn-bottom {
                    width: 150px;
                    background-color: red;
                    color: white;
                    padding: 8px;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    align-self: stretch;
                }


                @media (max-width: 991px) {
                .cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}
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
