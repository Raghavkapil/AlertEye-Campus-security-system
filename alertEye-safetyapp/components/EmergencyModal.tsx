
import React from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          
          <h2 className="text-lg font-bold text-slate-900 mb-1.5">Emergency Alert</h2>
          <p className="text-slate-500 mb-6 text-xs leading-relaxed">
            {isLoading ? "Generating location details and notifying contacts..." : "All trusted contacts have been notified with your current location details."}
          </p>

          <button 
            disabled={isLoading}
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md active:scale-95 ${isLoading ? 'bg-slate-300' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isLoading ? "Processing..." : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;