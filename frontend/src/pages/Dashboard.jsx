import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // 1. Get the user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // 2. Protect the route: Kick them out if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // 3. Setup the Axios configuration with the JWT Token
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    // 4. Fetch Data function
    const fetchData = async () => {
      try {
        // We can run both requests at the same time using Promise.all!
        const [expenseRes, categoryRes] = await Promise.all([
          axios.get('/api/expenses', config),
          axios.get('/api/categories', config)
        ]);

        setExpenses(expenseRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.log('Error fetching data:', error);
        // If the token expired or is invalid, log them out
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button className="btn-logout" onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-column">
          <h2>Your Expenses</h2>
          {expenses.length > 0 ? (
            <ul className="expense-list">
              {expenses.map((expense) => (
                <li key={expense._id} className="expense-item">
                  <div className="expense-details">
                    <strong>{expense.title}</strong>
                    <span className="expense-category">
                      {/* Because we used .populate() in our backend, category is an object! */}
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

        <section className="dashboard-column">
          <h2>Categories Loaded</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat._id}>{cat.name} ({cat.type})</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;