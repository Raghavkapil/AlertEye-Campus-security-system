
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [locEnabled, setLocEnabled] = useState(true);
  const [panicEnabled, setPanicEnabled] = useState(true);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Alert Eye</h1>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-slate-600 font-medium text-xs">Protected</span>
        </div>
      </div>

      {/* User Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
        <p className="text-slate-500 text-xs mb-5">{user.email}</p>
        
        <button 
          onClick={onLogout}
          className="text-red-500 font-bold text-xs bg-red-50 px-5 py-1.5 rounded-full hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Safety Status Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Safety Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span className="text-slate-600 font-medium text-xs">Live Location</span>
            </div>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">ON</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <span className="text-slate-600 font-medium text-xs">Panic Alerts</span>
            </div>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase">Enabled</span>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Preferences</h3>
        <div className="space-y-4">
          <button 
            onClick={() => setLocEnabled(!locEnabled)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <span className="font-medium text-xs">Share Location</span>
            </div>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${locEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${locEnabled ? 'left-5.5' : 'left-0.5'}`}></div>
            </div>
          </button>
          
          <button 
            onClick={() => setPanicEnabled(!panicEnabled)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="font-medium text-xs">Panic Alerts</span>
            </div>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${panicEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${panicEnabled ? 'left-5.5' : 'left-0.5'}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* About App */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-1.5 text-xs">About</h3>
        <p className="text-slate-500 text-[10px] leading-relaxed">
          AlertEye helps you stay safe by sharing your live location and notifying trusted contacts instantly during emergencies.
        </p>
      </div>
    </Layout>
  );
};

export default Profile;