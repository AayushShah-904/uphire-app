import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const VALID_EMAIL = 'admin@upteky.com';
const VALID_PASSWORD = 'upteky2025';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (email, password) => {
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
          const user = { email, name: 'Admin', role: 'HR Manager', avatar: null };
          set({ isAuthenticated: true, user });
          return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
