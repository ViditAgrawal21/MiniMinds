import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage utility functions
export const Storage = {
  // Set item in AsyncStorage
  setItem: async (key, value) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  },

  // Get item from AsyncStorage
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  // Remove item from AsyncStorage
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

  // Clear all AsyncStorage data
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  // Get multiple items
  getMultiple: async (keys) => {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result = {};
      values.forEach(([key, value]) => {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return {};
    }
  },
};

// Format utilities
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (digits.length >= 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  return phoneNumber;
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
