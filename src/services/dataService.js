import PropTypes from 'prop-types';

const dataService = {
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      try {
        return JSON.parse(item);
      } catch (err) {
        console.error(`Failed to parse stored value for key "${key}":`, err);
        return null;
      }
    } catch (err) {
      console.error(`Failed to access localStorage for key "${key}":`, err);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (err) {
      console.error(`Failed to store value for key "${key}":`, err);
      return false;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`Failed to remove item for key "${key}":`, err);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
      return false;
    }
  },

  getKeys: () => {
    try {
      return Object.keys(localStorage);
    } catch (err) {
      console.error('Failed to get localStorage keys:', err);
      return [];
    }
  },

  isAvailable: () => {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      return false;
    }
  }
};

dataService.propTypes = {
  getItem: PropTypes.func,
  setItem: PropTypes.func,
  removeItem: PropTypes.func,
  clear: PropTypes.func,
  getKeys: PropTypes.func,
  isAvailable: PropTypes.func
};

export default dataService;