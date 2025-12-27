
import React from 'react';
import { InferenceLogEntry, TelemetryData } from '../types';

interface RightSidebarProps {
  logs: InferenceLogEntry[];
  telemetry: TelemetryData;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ logs, telemetry }) => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Inference Log */}
      <div className="flex-1 bg-[#111111] border border-white/5 rounded-2xl p-5 flex flex-col overflow-hidden shadow-inner">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Inference Log</h3>
          <div className={`w-1.5 h-1.5 rounded-full ${telemetry.cpuUsage > 5 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-700'}`}></div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] pr-1">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-600 italic animate-pulse">Initializing engine...</p>
            </div>
          ) : (
            logs.map(log => (
              <div key={log.id} className="border-l-2 border-white/10 pl-3 py-1 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-600">[{log.timestamp}]</span>
                  <span className={`uppercase font-bold tracking-tighter ${
                    log.level === 'danger' ? 'text-red-500' : 
                    log.level === 'warning' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {log.level}
                  </span>
                </div>
                <p className="text-white/80 leading-snug break-words">{log.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Telemetry */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 space-y-4 flex-shrink-0">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Pi Telemetry</h3>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500 uppercase font-bold tracking-tighter">CPU Load</span>
              <span className="text-white font-mono">{Math.round(telemetry.cpuUsage)}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000" 
                style={{ width: `${telemetry.cpuUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-white/5 pt-2">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Latency</span>
            <span className="text-emerald-500 text-[10px] font-mono">{Math.round(telemetry.latency)}ms</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Temp</span>
            <span className={`text-[10px] font-mono ${telemetry.temp > 75 ? 'text-red-500 font-bold' : 'text-gray-300'}`}>
              {Math.round(telemetry.temp)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
