import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSection = ({ userId }) => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        birthDate: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...userInfo });

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user-profiles/${userId}`);
                setUserInfo(response.data);
                setEditForm(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    // Обновление данных пользователя
    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/profile/${userId}`,
                editForm
            );

            setUserInfo(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка обновления данных:', error);
        }
    };

    // Удаление пользователя
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/profile/${userId}`);
            alert('Пользователь удален');
            // Здесь можно добавить перенаправление или другие действия
        } catch (error) {
            console.error('Ошибка удаления пользователя:', error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <section className="profile-section">
                <h1 className="section-title">ЛИЧНЫЙ КАБИНЕТ</h1>
                <div className="profile-content">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8a2d15be390e29aa02b9672e51e40d6658dbd27"
                        alt="Profile"
                        className="profile-image"
                    />
                    {isEditing ? (
                        <div className="info-container">
                            <div className="info-grid">
                                <div className="labels">
                                    <p>ФИО:</p>
                                    <p>Электронная почта:</p>
                                    <p>Дата рождения:</p>
                                </div>
                                <div className="values">
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={editForm.full_name}
                                        onChange={handleEditChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleEditChange}
                                    />
                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={editForm.birth_date}
                                        onChange={handleEditChange}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="info-container">
                            <div className="info-grid">
                                <div className="labels">
                                    <p>ФИО:</p>
                                    <p>Электронная почта:</p>
                                    <p>Дата рождения:</p>
                                </div>
                                <div className="values">
                                    <p>{userInfo.full_name}</p>
                                    <p>{userInfo.email}</p>
                                    <p>{userInfo.birth_date}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="action-buttons">
                    {isEditing ? (
                        <>
                            <button className="action-button" onClick={handleUpdate}>
                                сохранить
                            </button>
                            <button className="action-button" onClick={() => setIsEditing(false)}>
                                отмена
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="action-button" onClick={() => setIsEditing(true)}>
                                изменить
                            </button>
                            <button className="action-button" onClick={handleDelete}>
                                удалить
                            </button>
                        </>
                    )}
                </div>
            </section>

        <style jsx>{`
          .profile-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            padding: 0 23px;
            font-family: Roboto Condensed;
            margin-bottom:180px;
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
            background-color: #f5f5f5;
            border-radius: 5px;
            border: 1px solid #0b56f9;
            padding: 20px;
            width: 766px;
          }
          .info-grid {
            display: flex;
            gap: 117px;
          }
          .labels, .values {
            display: flex;
            flex-direction: column;
            gap: 20px;
            color: #0b56f9;
            font-size: 20px;
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
            background-color: #f5f5f5;
            color: #0b56f9;
            font-size: 16px;
            cursor: pointer;
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

        </>
    );
};

export default ProfileSection;