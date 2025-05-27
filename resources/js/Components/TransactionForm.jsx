"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);

    const initialFormState = {
        amount: '',
        type: 'expense',
        description: '',
        date: '',
        category_id: '',
        new_category: ''
    };

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Ошибка загрузки категорий', err);
                setError('Не удалось загрузить категории');
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCategory = async () => {
        if (!form.new_category.trim()) {
            setError('Введите название категории');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/categories', {
                name: form.new_category.trim()
            });

            setCategories(prev => [...prev, response.data]);
            setForm(prev => ({
                ...prev,
                category_id: response.data.id,
                new_category: ''
            }));
            setShowNewCategory(false);
            setSuccess('Категория успешно добавлена');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка при добавлении категории', error);
            setError(error.response?.data?.message || 'Не удалось добавить категорию');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.amount || !form.category_id || !form.date) {
            setError('Пожалуйста, заполните обязательные поля');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await axios.post('/transactions', form);
            setForm(initialFormState);
            setSuccess('Транзакция успешно добавлена');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка при добавлении транзакции', error);
            setError(error.response?.data?.message || 'Не удалось добавить транзакцию');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Добавить транзакцию</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-field">
                    <label className="form-label">Тип транзакции*</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="type"
                                value="expense"  // Исправлено с expenses на expense
                                checked={form.type === 'expense'}
                                onChange={handleChange}
                            />
                            Расход
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="type"
                                value="income"
                                checked={form.type === 'income'}
                                onChange={handleChange}
                            />
                            Доход
                        </label>
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-label">Сумма*</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Категория*</label>
                    <select
                        name="category_id"
                        value={form.category_id}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {!showNewCategory ? (
                        <button
                            type="button"
                            className="action-button"
                            style={{ marginTop: '10px' }}
                            onClick={() => setShowNewCategory(true)}
                        >
                            + Новая категория
                        </button>
                    ) : (
                        <div className="new-category-field" style={{ marginTop: '10px' }}>
                            <input
                                type="text"
                                name="new_category"
                                value={form.new_category}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Введите название категории"
                                style={{ marginBottom: '8px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={handleAddCategory}
                                    className="add-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Добавление...' : 'Добавить категорию'}
                                </button>
                                <button
                                    type="button"
                                    className="action-button"
                                    onClick={() => setShowNewCategory(false)}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-field">
                    <label className="form-label">Дата*</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Описание</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="save-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить транзакцию'}
                    </button>
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
                .error-message {
                    color: #ff0000;
                    background-color: #ffeeee;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 16px;
                }
                .success-message {
                    color: #008000;
                    background-color: #eeffee;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 16px;
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
                    font-weight: 500;
                }
                .form-input,
                .form-select,
                .form-textarea {
                    width: 100%;
                    padding: 8px;
                    border-radius: 5px;
                    border: 1px solid #0b56f9;
                    background-color: #f5f5f5;
                }
                .form-textarea {
                    resize: vertical;
                    min-height: 80px;
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
                    cursor: pointer;
                }
                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 24px;
                }
                .action-button {
                    padding: 8px 16px;
                    border-radius: 5px;
                    border: 1px solid #0b56f9;
                    color: #0b56f9;
                    background-color: transparent;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .action-button:hover {
                    background-color: rgba(206, 219, 249, 0.78);
                }
                .add-button {
                    padding: 8px 16px;
                    border-radius: 5px;
                    border: none;
                    color: #fff;
                    background-color: #0b56f9;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .add-button:hover {
                    background-color: #0941c4;
                }
                .add-button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                .save-button {
                    padding: 8px 32px;
                    background-color: #0b56f9;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .save-button:hover {
                    background-color: #0941c4;
                }
                .save-button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                @media (max-width: 991px) {
                    .form-container {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default TransactionForm;