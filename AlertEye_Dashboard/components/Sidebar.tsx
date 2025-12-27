
import React from 'react';
import { Incident } from '../types';

interface SidebarProps {
  incidents: Incident[];
}

const Sidebar: React.FC<SidebarProps> = ({ incidents }) => {
  return (
    <aside className="w-80 bg-[#0d0d0d] border-r border-white/5 flex flex-col shrink-0">
      <div className="p-6 border-b border-white/5 bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-bold text-white tracking-tight">Live Alert Stream</h2>
          <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold border border-red-500/20">
            {incidents.length}
          </span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">Incident Forensics</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {incidents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-40 px-6 text-center">
            <svg className="w-10 h-10 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <p className="text-xs italic leading-relaxed">System standby. No violent activities detected in the current session.</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div 
              key={incident.id} 
              className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-300 shadow-lg"
            >
              {incident.thumbnail && (
                <div className="aspect-video relative overflow-hidden bg-black">
                  <img 
                    src={incident.thumbnail} 
                    alt="Incident Capture" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-[9px] font-bold text-white rounded uppercase shadow-lg">
                    Threat Det
                  </div>
                </div>
              )}
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-red-400 text-[11px] font-bold uppercase tracking-tight">{incident.type}</span>
                  <span className="text-[9px] font-mono text-gray-500">{incident.timestamp}</span>
                </div>
                
                {incident.description && (
                  <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">
                    {incident.description}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" 
                      style={{ width: `${incident.confidence}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-red-500 font-bold">{incident.confidence}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
            <span>Stream_Secure</span>
          </div>
          <span>v1.0.4-LTS</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
