
import React from 'react';

interface HeaderProps {
  status: 'MONITORING' | 'PAUSED';
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-white/5 bg-[#0d0d0d]">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold tracking-tight text-white">
            alert<span className="text-red-500">Eye</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-8 text-[11px] font-semibold tracking-wider">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 uppercase">Model:</span>
          <span className="text-blue-400">Ultralytics YOLOv8</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 uppercase">Status:</span>
          <span className={status === 'MONITORING' ? 'text-emerald-500' : 'text-amber-500'}>
            {status}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
