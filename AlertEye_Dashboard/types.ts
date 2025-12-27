
export interface Incident {
  id: string;
  timestamp: string;
  type: string;
  confidence: number;
  thumbnail?: string;
  description?: string;
}

export interface InferenceLogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'danger';
}

export interface TelemetryData {
  cpuUsage: number;
  latency: number;
  temp: number;
}
