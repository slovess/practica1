import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import debounce from 'lodash.debounce';

const COLORS = ['#0B56F9', '#6C5CFF', '#2ADFFF', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsChart = () => {
    const [summary, setSummary] = useState({ income: 0, expenses: 0 });
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState({
        transactions: true,
        categories: true
    });
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        categoryId: null,
        type: null
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const params = formatRequestParams(filters);
                const response = await axios.get('/transactions/summary', { params });
                setSummary({
                    income: response.data.income,
                    expenses: response.data.expenses
                });
            } catch (err) {
                console.error('Ошибка загрузки summary:', err);
            }
        };

        fetchSummary();
    }, [filters]);

    // Format request payload properly for GET request
    const formatRequestParams = (filters) => {
        const params = new URLSearchParams();

        if (filters.startDate) params.append('start_date', filters.startDate);
        if (filters.endDate) params.append('end_date', filters.endDate);
        if (filters.categoryId) params.append('category_id', filters.categoryId);
        if (filters.type) params.append('type', filters.type);

        return params;
    };

    // Debounced filter update
    const updateFilters = useCallback(debounce((newFilters) => {
        setFilters(newFilters);
    }, 500), []);

    // Fetch transactions with proper error handling
    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, transactions: true }));
            setError(null);

            const params = formatRequestParams(filters);

            const response = await axios.get('/transactions', {
                params,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setTransactions(response.data);
        } catch (err) {
            console.error('Transaction load error:', err);
            setError({
                message: err.response?.data?.message ||
                    err.response?.data?.error ||
                    'Failed to load transactions',
                details: err.response?.data?.errors || null,
                status: err.response?.status
            });
        } finally {
            setLoading(prev => ({ ...prev, transactions: false }));
        }
    }, [filters]);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, categories: true }));
            setError(null);
            const response = await axios.get('/categories');
            setCategories(response.data);
        } catch (err) {
            console.error('Categories load error:', err);
            setError({
                message: 'Failed to load categories',
                details: err.response?.data,
                status: err.response?.status
            });
        } finally {
            setLoading(prev => ({ ...prev, categories: false }));
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Process chart data with memoization
    const chartData = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];

        return transactions.reduce((acc, tx) => {
            const categoryName = tx.category?.name || 'Без категории';
            const amount = Math.abs(Number(tx.amount));
            const existing = acc.find(item => item.name === categoryName);

            if (existing) {
                existing.value += amount;
            } else {
                acc.push({
                    name: categoryName,
                    value: amount,
                    color: COLORS[acc.length % COLORS.length]
                });
            }
            return acc.sort((a, b) => b.value - a.value);
        }, []);
    }, [transactions]);

    // Calculate totals with memoization
    const { income, expenses } = useMemo(() => {
        return transactions.reduce((acc, tx) => {
            const amount = Math.abs(Number(tx.amount));
            if (tx.type === 'income') acc.income += amount;
            if (tx.type === 'expense') acc.expenses += amount;
            return acc;
        }, { income: 0, expenses: 0 });
    }, [transactions]);

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value || null };
        setFilters(newFilters);
        updateFilters(newFilters);
    };

    const isLoading = loading.transactions || loading.categories;

    return (
        <section className="chart-container">
            {/* Error Display */}
            {error && (
                <div className="error-message">
                    <strong>Error {error.status}:</strong> {error.message}
                    {error.details && (
                        <ul>
                            {Object.entries(error.details).map(([field, errors]) => (
                                <li key={field}>
                                    {field}: {Array.isArray(errors) ? errors.join(', ') : errors}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card income">
                    <p className="card-label">Доходы</p>
                    <p className="card-amount">{summary.income.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="summary-card expense">
                    <p className="card-label">Расходы</p>
                    <p className="card-amount">{summary.expenses.toLocaleString('ru-RU')} ₽</p>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="filter-controls">
                <div className="filter-group">
                    <label>Период:</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        className="filter-input"
                    />
                    <span>—</span>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label>Категория:</label>
                    <select
                        value={filters.categoryId || ''}
                        onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Все категории</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Тип:</label>
                    <select
                        value={filters.type || ''}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Все</option>
                        <option value="income">Доходы</option>
                        <option value="expense">Расходы</option>
                    </select>
                </div>
            </div>

            {/* Chart */}
            <div className="chart-wrapper">
                {isLoading ? (
                    <div className="loading">Загрузка данных...</div>
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={150}
                                innerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`${value.toLocaleString('ru-RU')} ₽`, 'Сумма']}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="no-data">Нет данных для отображения</div>
                )}
            </div>

            <style jsx>{`
        .chart-container {
          width: 100%;
          max-width: 900px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
        }

        .error-message {
          color: #e53e3e;
          background-color: #fff5f5;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #fed7d7;
        }

        .error-message ul {
          margin-top: 8px;
          padding-left: 20px;
        }

        .error-message li {
          margin-bottom: 4px;
        }

        .summary-cards {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }

        .summary-card {
          flex: 1;
          border-radius: 8px;
          background-color: #ffffff;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .summary-card.income {
          border-top: 4px solid #0B56F9;
        }

        .summary-card.expense {
          border-top: 4px solid #6C5CFF;
        }

        .card-label {
          color: #4a5568;
          font-size: 14px;
          margin: 0 0 8px 0;
        }

        .card-amount {
          color: #1a202c;
          font-size: 24px;
          margin: 0;
          font-weight: 500;
        }

        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          align-items: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        label {
          font-size: 14px;
          color: #4a5568;
        }

        .filter-input, .filter-select {
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          height: 36px;
          transition: border-color 0.2s;
        }

        .filter-input:focus, .filter-select:focus {
          outline: none;
          border-color: #0B56F9;
          box-shadow: 0 0 0 2px rgba(11, 86, 249, 0.1);
        }

        .chart-wrapper {
          height: 400px;
          margin-top: 20px;
        }

        .loading, .no-data {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: #4a5568;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .summary-cards {
            flex-direction: column;
          }

          .filter-controls {
            flex-direction: column;
            align-items: flex-start;
          }

          .filter-group {
            width: 100%;
          }

          .filter-input, .filter-select {
            flex-grow: 1;
          }
        }
      `}</style>
        </section>
    );
};

export default AnalyticsChart;