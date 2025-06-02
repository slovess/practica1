import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';

const ProfileSection = () => {
    const { auth } = usePage().props;
    const [userInfo, setUserInfo] = useState({
        name: auth.user.name,
        email: auth.user.email
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...userInfo });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/profile/${auth.user.id}`, editForm);
            setUserInfo(editForm);
            setIsEditing(false);
        } catch (err) {
            setError('Ошибка обновления данных');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <style jsx>{`
                .profile-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 40px;
                    padding: 0 23px;
                    font-family: Roboto Condensed;
                    margin-bottom: 180px;
                }
                .section-title {
                    color: #0b56f9;
                    font-family: Roboto Condensed;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 40px;
                }
                .profile-content {
                    display: flex;
                    gap: 87px;
                }
                .profile-image {
                    width: 143px;
                    height: 184px;
                    border-radius: 5px;
                    object-fit: cover;
                }
                .info-container {
                    background-color: white;
                    border-radius: 5px;
                    border: 1px solid #0b56f9;
                    padding: 20px;
                    width: 500px;
                }
                .info-grid {
                    margin-top: 20px;
                    margin-left: 30px;
                    display: flex;
                    gap: 100px;
                }
                .labels, .values {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    color: #0b56f9;
                    font-size: 20px;
                }
                .values input {
                    border: 1px solid #0b56f9;
                    padding: 5px;
                    border-radius: 3px;
                    font-size: 16px;
                    color: #0b56f9;
                }
                .action-buttons {
                    display: flex;
                    gap: 85px;
                    margin-top: 48px;
                }
                .action-button {
                    width: 177px;
                    height: 31px;
                    border-radius: 5px;
                    border: 1px solid #0b56f9;
                    background-color: white;
                    color: #0b56f9;
                    font-size: 16px;
                    cursor: pointer;
                    font-family: Roboto Condensed;
                }
                .action-button:hover {
                    background-color: #f0f5ff;
                }
                .action-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .logout-button {
                    background-color: #f44336;
                    color: white;
                    border: 1px solid #f44336;
                }
                .logout-button:hover {
                    background-color: #d32f2f;
                }
                @media (max-width: 991px) {
                    .profile-content {
                        flex-direction: column;
                        align-items: center;
                        gap: 40px;
                    }
                    .info-container {
                        width: 100%;
                    }
                }
                @media (max-width: 640px) {
                    .profile-section {
                        padding: 0 16px;
                    }
                    .info-grid {
                        flex-direction: column;
                        gap: 20px;
                    }
                    .action-buttons {
                        flex-direction: column;
                        gap: 20px;
                    }
                }
            `}</style>

            <section className="profile-section">
                <h1 className="section-title">ЛИЧНЫЙ КАБИНЕТ</h1>

                {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

                <div className="profile-content">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8a2d15be390e29aa02b9672e51e40d6658dbd27"
                        alt="Profile"
                        className="profile-image"
                    />

                    <div className="info-container">
                        <div className="info-grid">
                            <div className="labels">
                                <p>ФИО:</p>
                                <p>Email:</p>

                            </div>

                            {isEditing ? (
                                <div className="values">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                        disabled={isLoading}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleEditChange}
                                        disabled={isLoading}
                                    />

                                </div>
                            ) : (
                                <div className="values">
                                    <p>{userInfo.name}</p>
                                    <p>{userInfo.email}</p>

                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    {isEditing ? (
                        <>
                            <button
                                className="action-button"
                                onClick={handleUpdate}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : 'Сохранить'}
                            </button>
                            <button
                                className="action-button"
                                onClick={() => setIsEditing(false)}
                                disabled={isLoading}
                            >
                                Отмена
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="action-button"
                                onClick={() => setIsEditing(true)}
                            >
                                Изменить
                            </button>
                            <button
                                className="action-button logout-button"
                                onClick={handleLogout}
                            >
                                Выйти
                            </button>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProfileSection;