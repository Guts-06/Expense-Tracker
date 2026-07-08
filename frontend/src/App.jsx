import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // 1. MAKE SURE THIS IS IMPORTED

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 2. UPDATE THIS LINE TO USE THE COMPONENT, NOT THE <H2> TAG */}
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </div>
  );
}

export default App;