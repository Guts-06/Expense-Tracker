import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ categories, token, onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    expenseDate: '',
    category: '',
  });

  const { title, amount, expenseDate, category } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert('Please select a category');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 1. Send the data to the backend
      const response = await axios.post('/api/expenses', formData, config);

      // 2. We need to manually attach the category object to the response so the UI doesn't crash 
      // (because the backend only returns the raw ID on creation, but our UI expects the populated name)
      const populatedExpense = {
        ...response.data,
        category: categories.find((cat) => cat._id === response.data.category),
      };

      // 3. Send the new expense back to the Dashboard
      onExpenseAdded(populatedExpense);

      // 4. Clear the form for the next entry
      setFormData({ title: '', amount: '', expenseDate: '', category: '' });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert(message);
    }
  };

  return (
    <div className="form-container" style={{ margin: '0 0 20px 0', width: '100%' }}>
      <h3>Add New Expense</h3>
      <form onSubmit={onSubmit} style={{ marginTop: '15px' }}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Expense Title (e.g., Target Run)"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="amount"
            value={amount}
            placeholder="Amount (e.g., 45.50)"
            onChange={onChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="expenseDate"
            value={expenseDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select name="category" value={category} onChange={onChange} className="form-select" required>
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-block">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;