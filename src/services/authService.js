import PropTypes from 'prop-types';

const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  },

  validateSession: async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Session validation failed');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message || 'Session validation failed');
    }
  },

  logout: async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return true;
    } catch (err) {
      throw new Error(err.message || 'Logout failed');
    }
  }
};

authService.propTypes = {
  login: PropTypes.func,
  register: PropTypes.func,
  validateSession: PropTypes.func,
  logout: PropTypes.func
};

export default authService;