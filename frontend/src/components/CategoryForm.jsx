import { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ token, onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
  });

  const { name, type } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter a category name');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('/api/categories', formData, config);

      // Send the new category back to the parent (e.g. Dashboard)
      onCategoryAdded(response.data);

      // Clear the form for the next entry
      setFormData({ name: '', type: 'expense' });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert(message);
    }
  };

  return (
    <div className="form-container" style={{ margin: '0 0 20px 0', width: '100%' }}>
      <h3>Add New Category</h3>
      <form onSubmit={onSubmit} style={{ marginTop: '15px' }}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Category Name (e.g., Groceries)"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select name="type" value={type} onChange={onChange} className="form-select" required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" className="btn btn-block">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;