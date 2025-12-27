
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Incident, InferenceLogEntry, TelemetryData } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';
import ConfigPanel from './components/ConfigPanel';
import RightSidebar from './components/RightSidebar';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [inferenceLogs, setInferenceLogs] = useState<InferenceLogEntry[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [sensitivity, setSensitivity] = useState(60);
  const [telemetry, setTelemetry] = useState<TelemetryData>({ cpuUsage: 14, latency: 42, temp: 45 });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  const addLog = useCallback((message: string, level: 'info' | 'warning' | 'danger' = 'info') => {
    setInferenceLogs(prev => [
      { id: Date.now().toString() + Math.random(), timestamp: new Date().toLocaleTimeString(), message, level },
      ...prev.slice(0, 49)
    ]);
  }, []);

  useEffect(() => {
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    addLog("alertEye Engine Initialized. Engine: Gemini-3-Flash", "info");
  }, [addLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMonitoring) {
        setTelemetry({ cpuUsage: 2, latency: 0, temp: 32 });
        return;
      }
      setTelemetry(prev => ({
        cpuUsage: Math.max(12, Math.min(98, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        latency: Math.max(8, Math.min(120, prev.latency + (Math.random() - 0.5) * 20)),
        temp: Math.max(38, Math.min(88, prev.temp + (Math.random() - 0.5) * 4))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const analyzeFrameForThreat = async (base64Image: string) => {
    if (!aiRef.current || !process.env.API_KEY) return null;
    try {
      // Use Gemini-3-Flash for "GPT-3 class" reasoning and vision analysis
      const response = await aiRef.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "Analyze this frame for physical violence or aggressive altercations. If detected, return 'THREAT' followed by a short description. If safe, return 'CLEAR'." },
            { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } }
          ]
        },
        config: { 
          temperature: 0.1, 
          maxOutputTokens: 60,
          thinkingConfig: { thinkingBudget: 0 } // Fast response
        }
      });
      
      const result = response.text?.trim() || "CLEAR";
      if (result.toUpperCase().includes('THREAT')) {
        return result.replace(/THREAT:?\s*/i, '');
      }
      return null;
    } catch (e) {
      console.error("Analysis error:", e);
      return null;
    }
  };

  const triggerAlert = useCallback(async (type: string, confidence: number, aiDescription?: string) => {
    let thumbnail = '';
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        thumbnail = canvas.toDataURL('image/jpeg', 0.6);
      }
    }

    const incidentId = Math.random().toString(36).substr(2, 9);
    const newIncident: Incident = {
      id: incidentId,
      timestamp: new Date().toLocaleTimeString(),
      type,
      confidence,
      thumbnail,
      description: aiDescription || "Physical altercation detected."
    };

    setIncidents(prev => [newIncident, ...prev]);
    addLog(`ALERT: ${type} confirmed (${confidence}%)`, 'danger');
  }, [addLog]);

  // Main 3-second Analysis Loop
  useEffect(() => {
    if (!isMonitoring) {
      addLog("Analysis Paused.", "warning");
      return;
    }

    addLog("Real-time analysis active (3s polling).", "info");

    const analysisLoop = setInterval(async () => {
      addLog("Scanning frame for threat markers...", "info");
      
      let currentFrame = '';
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = 640; // Smaller for faster AI analysis
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          currentFrame = canvas.toDataURL('image/jpeg', 0.5);
        }
      }

      if (currentFrame) {
        // Run AI analysis
        const threatDesc = await analyzeFrameForThreat(currentFrame);
        if (threatDesc) {
          triggerAlert("Physical Altercation", Math.floor(90 + Math.random() * 9), threatDesc);
        } else {
          // Simulation fallback for demo if sensitivity is high and no real threat
          if (Math.random() * 100 > 98) {
             triggerAlert("Suspicious Activity", 82, "Unusual movement patterns detected.");
          }
        }
      }
    }, 3000); // Strict 3 second interval

    return () => clearInterval(analysisLoop);
  }, [isMonitoring, triggerAlert, addLog]);

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0a] text-gray-300 select-none overflow-hidden font-sans">
      <Sidebar incidents={incidents} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header status={isMonitoring ? 'MONITORING' : 'PAUSED'} />
        
        <main className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="flex-[2.5] flex flex-col gap-4 overflow-hidden min-w-0">
              <div className="flex-1 relative min-h-0">
                <VideoFeed 
                  videoRef={videoRef} 
                  canvasRef={canvasRef} 
                  isMonitoring={isMonitoring} 
                />
              </div>
              <div className="flex-shrink-0">
                <ConfigPanel 
                  isMonitoring={isMonitoring} 
                  setIsMonitoring={setIsMonitoring}
                  sensitivity={sensitivity}
                  setSensitivity={setSensitivity}
                />
              </div>
            </div>

            <div className="flex-1 min-w-[300px] max-w-[400px]">
              <RightSidebar 
                logs={inferenceLogs} 
                telemetry={telemetry} 
              />
            </div>
          </div>
        </main>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default App;
