import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login';
import Workouts from './pages/Workouts';

import { UserProvider } from './context/UserContext';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setNewToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  }

  const isAuthenticated = () => !!token;

  return (
      <UserProvider value={{ token, setNewToken, clearToken, isAuthenticated }}>
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated() ? <Workouts /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    );
  }

export default App
