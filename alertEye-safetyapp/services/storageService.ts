import { User, Contact } from '../types';

/**
 * LOCAL STORAGE SERVICE
 * Used only for:
 * - Auth simulation
 * - Trusted contacts
 *
 * 🚫 Alerts are NO LONGER handled here
 * Alerts are handled by Django backend
 */

const STORAGE_KEY_USER = 'alerteye_user';

// Helper to get contact storage key for a specific user
const getContactsKey = (email: string) => `alerteye_contacts_${email}`;

export const storageService = {
  // ---------------- AUTH ----------------

  login: async (email: string): Promise<User> => {
    const existingUserKey = `alerteye_account_${email}`;
    const existingUserData = localStorage.getItem(existingUserKey);

    let user: User;
    if (existingUserData) {
      user = JSON.parse(existingUserData);
    } else {
      user = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split('@')[0],
        role: 'Premium',
      };
      localStorage.setItem(existingUserKey, JSON.stringify(user));
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY_USER);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    return data ? JSON.parse(data) : null;
  },

  // ---------------- CONTACTS ----------------

  getContacts: async (email: string): Promise<Contact[]> => {
    const data = localStorage.getItem(getContactsKey(email));
    return data ? JSON.parse(data) : [];
  },

  addContact: async (userEmail: string, contact: Contact): Promise<Contact[]> => {
    const contacts = await storageService.getContacts(userEmail);
    const updated = [...contacts, contact];
    localStorage.setItem(getContactsKey(userEmail), JSON.stringify(updated));
    return updated;
  },

  removeContact: async (userEmail: string, contactId: string): Promise<Contact[]> => {
    const contacts = await storageService.getContacts(userEmail);
    const updated = contacts.filter(c => c.id !== contactId);
    localStorage.setItem(getContactsKey(userEmail), JSON.stringify(updated));
    return updated;
  },
};
