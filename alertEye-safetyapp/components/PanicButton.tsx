
import React from 'react';

interface PanicButtonProps {
  onClick: () => void;
}

const PanicButton: React.FC<PanicButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    // Trigger haptic feedback if supported
    if ('vibrate' in navigator) {
      // Vibrate pattern: 200ms on, 100ms off, 200ms on
      navigator.vibrate([200, 100, 200]);
    }
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      style={{ bottom: '80px' }}
      className="absolute right-4 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-2.5 flex items-center gap-1.5 shadow-lg transition-all active:scale-95 z-50 ring-2 ring-red-100"
    >
      <div className="bg-white/20 rounded-full p-1 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <span className="font-bold tracking-tight text-[10px] uppercase">Panic</span>
    </button>
  );
};

export default PanicButton;
