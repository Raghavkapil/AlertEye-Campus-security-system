
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = await storageService.login(email);
    onLogin(user);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 bg-slate-50">
      <div className="w-full bg-white rounded-[32px] shadow-xl p-8 flex flex-col items-center border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">AlertEye</h1>
        <p className="text-slate-500 mb-8 text-sm">Welcome back 👋</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-sm"
            />
          </div>
          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 text-sm"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-100 active:scale-95 transition-transform mt-2"
          >
            Login
          </button>
        </form>
        
        <div className="mt-8 text-slate-500 text-sm">
          New here? <Link to="/signup" className="text-indigo-600 font-bold">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;