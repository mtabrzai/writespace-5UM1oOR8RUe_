import PropTypes from 'prop-types';
import { useAuth } from '../store/authStore';

const adminService = {
  getUsers: async () => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch users');
    }
  },

  updateUser: async (userId, userData) => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to update user');
    }
  },

  deleteUser: async (userId) => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      return true;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete user');
    }
  },

  getStats: async () => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch stats');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch stats');
    }
  }
};

adminService.propTypes = {
  getUsers: PropTypes.func,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,
  getStats: PropTypes.func
};

export default adminService;