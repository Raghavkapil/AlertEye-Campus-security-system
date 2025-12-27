import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PanicButton from '../components/PanicButton';
import EmergencyModal from '../components/EmergencyModal';
import { storageService } from '../services/storageService';
import { getBuildingType } from '../services/geminiService';
import { User, Contact } from '../types';

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSharing, setIsSharing] = useState(true);

  // Load user-specific contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      const userContacts = await storageService.getContacts(user.email);
      setContacts(userContacts);
    };
    fetchContacts();
  }, [user.email]);

  // 🚨 PANIC BUTTON HANDLER (SEND TO DJANGO)
  const handlePanicClick = async () => {
    setIsEmergencyOpen(true);
    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const buildingType = await getBuildingType(latitude, longitude);

          const formData = new FormData();
          formData.append('username', user.name);
          formData.append('location_name', buildingType);
          formData.append('latitude', latitude.toString());
          formData.append('longitude', longitude.toString());

          try {
            await fetch('http://127.0.0.1:8000/api/alerts/create/', {
              method: 'POST',
              body: formData,
            });
          } catch (err) {
            console.error('Failed to send alert:', err);
          }

          setIsLocating(false);
        },
        (error) => {
          console.error('Location error:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const addContact = async () => {
    if (!newContactName || !newContactEmail) return;

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newContactName,
      email: newContactEmail,
    };

    const updated = await storageService.addContact(user.email, newContact);
    setContacts(updated);
    setNewContactName('');
    setNewContactEmail('');
  };

  const removeContact = async (id: string) => {
    const updated = await storageService.removeContact(user.email, id);
    setContacts(updated);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-slate-900">Alert Eye</h1>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate-600 font-medium text-xs">Protected</span>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-green-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-800">Live Location</h2>
        </div>

        <button
          onClick={() => setIsSharing(!isSharing)}
          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
            isSharing
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-slate-50 text-slate-500 border border-slate-200'
          }`}
        >
          {isSharing ? 'Sharing ON' : 'Sharing OFF'}
        </button>
      </div>

      {/* Trusted Contacts Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <h2 className="text-base font-bold text-slate-800 mb-3">Trusted Contacts</h2>

        <div className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
          />
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={addContact}
              className="bg-indigo-600 text-white rounded-xl px-3 shadow-md active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800 text-[11px]">{contact.name}</p>
                <p className="text-slate-500 text-[9px]">{contact.email}</p>
              </div>
              <button
                onClick={() => removeContact(contact.id)}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <PanicButton onClick={handlePanicClick} />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        isLoading={isLocating}
      />
    </Layout>
  );
};

export default Home;
