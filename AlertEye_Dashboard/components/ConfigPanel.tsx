
import React from 'react';

interface ConfigPanelProps {
  isMonitoring: boolean;
  setIsMonitoring: (val: boolean) => void;
  sensitivity: number;
  setSensitivity: (val: number) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  isMonitoring, 
  setIsMonitoring, 
  sensitivity, 
  setSensitivity 
}) => {
  return (
    <div className="bg-[#111111] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
      <div className="flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">System Configuration</h3>
      </div>

      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-white/90">Detection Status</label>
            <button 
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`w-10 h-5 rounded-full transition-all duration-300 relative focus:outline-none ${isMonitoring ? 'bg-red-600' : 'bg-gray-700'}`}
              aria-label="Toggle Monitoring"
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${isMonitoring ? 'left-5.5' : 'left-0.5'}`}
              ></div>
            </button>
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            Toggle real-time violence detection analysis.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-white/90">Analysis Confidence</label>
            <span className="text-[10px] font-mono text-red-500 font-bold">{sensitivity}%</span>
          </div>
          <div className="relative">
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={sensitivity} 
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[7px] uppercase tracking-tighter text-gray-600 mt-1 font-bold">
              <span>Low (Fast)</span>
              <span>Med (Balanced)</span>
              <span>High (Strict)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
