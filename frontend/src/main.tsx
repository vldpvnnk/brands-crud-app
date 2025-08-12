import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Brands from './pages/Brands';

function App() {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location.pathname]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/brands" element={token ? <Brands /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? '/brands' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
