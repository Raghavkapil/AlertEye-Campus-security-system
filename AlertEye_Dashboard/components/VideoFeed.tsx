
import React, { useEffect } from 'react';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isMonitoring: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ videoRef, canvasRef, isMonitoring }) => {
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user', 
            width: { ideal: 1280 }, 
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or hardware error:", err);
      }
    }
    setupCamera();
  }, [videoRef]);

  return (
    <div className="absolute inset-0 bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className={`w-full h-full object-contain ${isMonitoring ? 'opacity-100' : 'opacity-30 grayscale'}`}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>
      
      {/* HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
              <div className={`w-1.5 h-1.5 rounded-full ${isMonitoring ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-[9px] font-black tracking-widest text-white uppercase">
                {isMonitoring ? 'REC // LIVE' : 'STBY'}
              </span>
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-white/60 bg-black/70 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex gap-1 h-3 items-end">
              {[0.6, 0.4, 0.9, 0.7, 0.5].map((h, i) => (
                <div key={i} className="w-1 bg-red-500/40" style={{ height: `${h * 100}%` }}></div>
              ))}
            </div>
            <span className="text-[7px] font-black tracking-[0.3em] text-white/40 uppercase">ANALYSIS</span>
          </div>
          <div className="text-[9px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded">
            FPS: 30
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="w-1/2 h-1/2 border border-white/20 rounded-lg relative">
          <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-white/30 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-white/30 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
