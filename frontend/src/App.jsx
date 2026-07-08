import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route goes to login for now */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<h2>Dashboard (Protected)</h2>} />
      </Routes>
    </div>
  );
}

export default App;