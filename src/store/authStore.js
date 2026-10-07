import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import PropTypes from 'prop-types';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      lastActivity: null,

      login: (userData, token) => {
        const now = new Date();
        set({
          user: userData,
          token,
          isAuthenticated: true,
          lastActivity: now.getTime()
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          lastActivity: null
        });
      },

      updateLastActivity: () => {
        const now = new Date();
        set({ lastActivity: now.getTime() });
      },

      checkSessionTimeout: () => {
        const timeoutMinutes = parseInt(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES || '30', 10);
        const timeoutMs = timeoutMinutes * 60 * 1000;
        const now = new Date().getTime();

        set((state) => {
          if (state.lastActivity && now - state.lastActivity > timeoutMs) {
            return {
              user: null,
              token: null,
              isAuthenticated: false,
              lastActivity: null
            };
          }
          return state;
        });
      }
    }),
    {
      name: import.meta.env.VITE_AUTH_COOKIE_NAME || 'writespace_auth_token',
      partialize: (state) => ({
        token: state.token,
        lastActivity: state.lastActivity
      })
    }
  )
);

export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    login: store.login,
    logout: store.logout,
    updateLastActivity: store.updateLastActivity,
    checkSessionTimeout: store.checkSessionTimeout
  };
};

useAuth.propTypes = {
  children: PropTypes.node
};

export default useAuthStore;