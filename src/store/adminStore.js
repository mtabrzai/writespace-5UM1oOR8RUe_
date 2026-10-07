import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import PropTypes from 'prop-types';
import { useAuth } from './authStore';

const useAdminStore = create(
  persist(
    (set, get) => ({
      users: [],
      stats: null,
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
          }

          const data = await response.json();
          set({ users: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateUser: async (userId, userData) => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });

          if (!response.ok) {
            throw new Error(`Failed to update user: ${response.statusText}`);
          }

          const data = await response.json();
          set((state) => ({
            users: state.users.map(user => user.id === userId ? data : user),
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      deleteUser: async (userId) => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.statusText}`);
          }

          set((state) => ({
            users: state.users.filter(user => user.id !== userId),
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      fetchStats: async () => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch stats: ${response.statusText}`);
          }

          const data = await response.json();
          set({ stats: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'writespace_admin_store',
      partialize: (state) => ({
        users: state.users,
        stats: state.stats
      })
    }
  )
);

export const useAdmin = () => {
  const store = useAdminStore();
  return {
    users: store.users,
    stats: store.stats,
    isLoading: store.isLoading,
    error: store.error,
    fetchUsers: store.fetchUsers,
    updateUser: store.updateUser,
    deleteUser: store.deleteUser,
    fetchStats: store.fetchStats,
    clearError: store.clearError
  };
};

useAdmin.propTypes = {
  children: PropTypes.node
};

export default useAdminStore;