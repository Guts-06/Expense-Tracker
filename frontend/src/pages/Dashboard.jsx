import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm'; // <-- 1. Import the form

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const fetchData = async () => {
            try {
                const [expenseRes, categoryRes] = await Promise.all([
                    axios.get('/api/expenses', config),
                    axios.get('/api/categories', config)
                ]);
                console.log("MY EXPENSES:", expenseRes.data);
                setExpenses(expenseRes.data);
                setCategories(categoryRes.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [user, navigate]);

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // 2. Create the callback function to handle new expenses
    const handleExpenseAdded = (newExpense) => {
        // This takes the current array of expenses, and puts the new one at the very top!
        setExpenses([newExpense, ...expenses]);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}</h1>
                <button className="btn-logout" onClick={onLogout}>Logout</button>
            </header>

            <div className="dashboard-content">
                {/* 3. Add the form column here */}
                <section className="dashboard-column">
                    <ExpenseForm
                        categories={categories}
                        token={user?.token}
                        onExpenseAdded={handleExpenseAdded}
                    />
                </section>

                <section className="dashboard-column" style={{ flex: 2 }}>
                    <h2>Your Expenses</h2>
                    {expenses.length > 0 ? (
                        <ul className="expense-list">
                            {expenses.map((expense) => (
                                <li key={expense._id} className="expense-item">
                                    <div className="expense-details">
                                        <strong>{expense.title}</strong>
                                        <span className="expense-category">
                                            {expense.category?.name || 'Uncategorized'}
                                        </span>
                                    </div>
                                    <div className="expense-amount">
                                        ${expense.amount.toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have not added any expenses yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;