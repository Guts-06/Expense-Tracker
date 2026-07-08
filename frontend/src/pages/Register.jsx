import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // <-- Import axios

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  
  // useNavigate allows us to change pages via code
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } 

    try {
      // 1. Send the POST request to our backend
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password
      });

      // 2. If successful, save the user data (including the token) to localStorage
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // 3. Redirect the user to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Extract the error message from our backend
      const message = error.response?.data?.message || error.message;
      alert(message);
    }
  };
  return (
    <div className="form-container">
      <section className="heading">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <p className="redirect-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;