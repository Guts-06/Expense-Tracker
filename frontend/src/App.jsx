import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* We will build these actual components in the next milestones */}
        <Route path="/" element={<h1>Welcome to Expense Tracker</h1>} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/register" element={<h2>Register Page</h2>} />
        <Route path="/dashboard" element={<h2>Dashboard (Protected)</h2>} />
      </Routes>
    </div>
  );
}

export default App;