'use client';

import { create } from 'zustand';
import { Models } from 'appwrite';
import { account, ID } from '@/lib/appwrite';

// --- 1. Define the Interface ---
interface AuthState {
  user: Models.User<Models.Preferences> | null;
  sessions: Models.Session[];
  loading: boolean;


  // Core Auth
  initAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;

  // Profile Management
  updateName: (name: string) => Promise<void>;
  updateEmail: (email: string, password: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updatePrefs: (prefs: object) => Promise<void>;

  // Sessions 
  // Session Management
  fetchSessions: () => Promise<void>; // <--- Added
  revokeSession: (sessionId: string) => Promise<void>; // <--- Added

  // Password Recovery (Forgot Password)
  requestPasswordRecovery: (email: string, url: string) => Promise<void>;
  completePasswordRecovery: (userId: string, secret: string, password: string, passwordAgain: string) => Promise<void>;

  // Email Verification
  sendEmailVerification: (url: string) => Promise<void>;
  completeEmailVerification: (userId: string, secret: string) => Promise<void>;
}

// --- 2. Define Initial State (Crucial for SSR Safety) ---
const defaultInitialState: AuthState = {
    user: null,
    sessions: [],
    loading: true,
    initAuth: async () => { },
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    updateName: async () => { },
    updateEmail: async () => { },
    updatePassword: async () => { },
    updatePrefs: async () => { },
    requestPasswordRecovery: async () => { },
    completePasswordRecovery: async () => { },
    sendEmailVerification: async () => { },
    completeEmailVerification: async () => { },
    fetchSessions: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    revokeSession: function (sessionId: string): Promise<void> {
        throw new Error('Function not implemented.');
    }
};

// --- 3. Create the Store ---
export const useAuthStore = create<AuthState>((set, get) => ({
  ...defaultInitialState, // Apply SSR-safe defaults

  // --- CORE AUTH ---

  initAuth: async () => {
    set({ loading: true });
    try {
      const user = await account.get();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password, name = 'User') => {
    set({ loading: true });
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await account.deleteSession('current');
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // --- PROFILE MANAGEMENT ---

  updateName: async (name: string) => {
    set({ loading: true });
    try {
      await account.updateName(name);
      // Fetch fresh user data to update state
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Update name failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEmail: async (email: string, password: string) => {
    set({ loading: true });
    try {
      // Appwrite requires password confirmation to change sensitive data like email
      await account.updateEmail(email, password);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Update email failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePassword: async (oldPassword, newPassword) => {
    set({ loading: true });
    try {
      await account.updatePassword(newPassword, oldPassword);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Update password failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePrefs: async (prefs: object) => {
    set({ loading: true });
    try {
      await account.updatePrefs(prefs);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Update prefs failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // --- PASSWORD RECOVERY (Forgot Password) ---

  fetchSessions: async () => {
    // We don't necessarily need to trigger global loading for this, 
    // but we can if you want a spinner.
    try {
      const response = await account.listSessions();
      set({ sessions: response.sessions });
    } catch (error) {
      console.error('Fetch sessions failed:', error);
    }
  },

  revokeSession: async (sessionId: string) => {
    try {
      await account.deleteSession(sessionId);
      // Optimistically update the UI by filtering out the deleted session
      set((state) => ({
        sessions: state.sessions.filter((s) => s.$id !== sessionId)
      }));
    } catch (error) {
      console.error('Revoke session failed:', error);
      throw error;
    }
  },

  // 1. Send the email
  requestPasswordRecovery: async (email, url) => {
    set({ loading: true });
    try {
      // url = 'http://localhost:3000/reset-password' (Your frontend route)
      await account.createRecovery(email, url); 
    } catch (error) {
      console.error('Recovery request failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // 2. Complete the reset (on the reset-password page)
completePasswordRecovery: async (userId, secret, password, passwordAgain) => {
    set({ loading: true });
    try {
      // ⚠️ FIX: Pass only 3 arguments: userId, secret, and password.
      // Make sure you validate that password === passwordAgain in your UI component before calling this.
      await account.updateRecovery(userId, secret, password);
      
    } catch (error) {
      console.error('Recovery completion failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // --- EMAIL VERIFICATION ---

  sendEmailVerification: async (url) => {
    set({ loading: true });
    try {
      // url = 'http://localhost:3000/verify-email'
      await account.createVerification(url);
    } catch (error) {
      console.error('Verification email send failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  completeEmailVerification: async (userId, secret) => {
    set({ loading: true });
    try {
      await account.updateVerification(userId, secret);
      // Refresh user to show "emailVerification: true"
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error('Verification completion failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

}));