
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { storageService } from './services/storageService';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(storageService.getCurrentUser());

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative overflow-hidden flex flex-col">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
