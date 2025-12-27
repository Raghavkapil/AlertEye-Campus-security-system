
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  description?: string;
}

export interface Alert {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  timestamp: number;
  location: Location;
  status: 'active' | 'resolved';
  trustedEmails: string[];
}

export interface AppState {
  user: User | null;
  contacts: Contact[];
  locationSharing: boolean;
  panicEnabled: boolean;
  alerts: Alert[];
}
