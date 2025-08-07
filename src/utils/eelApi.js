// Eel API utility for communicating with Python backend
// This file provides a clean interface for calling Python functions from JavaScript

// Declare eel variable to avoid undefined errors
/* global eel */

// Check if Eel is available (when running with Python backend)
const isEelAvailable = () => {
  return typeof eel !== 'undefined' && eel !== null;
};

// Generic function to call Python functions with error handling
const callPythonFunction = async (functionName, ...args) => {
  if (!isEelAvailable()) {
    console.warn('Eel is not available. Running in standalone mode.');
    return { success: false, error: 'Eel not available - running in standalone mode' };
  }

  try {
    const result = await eel[functionName](...args)();
    return result;
  } catch (error) {
    console.error(`Error calling Python function ${functionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Authentication functions
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Get user profile
  getProfile: async (token) => {
    const response = await fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Update user profile
  updateProfile: async (token, profileData) => {
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};

// Tax management functions
export const taxAPI = {
  // Create a new tax record
  createRecord: async (token, taxData) => {
    const response = await fetch('/api/tax/records', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taxData),
    });
    return response.json();
  },

  // Get all tax records for user
  getRecords: async (token) => {
    const response = await fetch('/api/tax/records', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Get specific tax record
  getRecord: async (token, recordId) => {
    const response = await fetch(`/api/tax/records/${recordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Update tax record
  updateRecord: async (token, recordId, updateData) => {
    const response = await fetch(`/api/tax/records/${recordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return response.json();
  },

  // Delete tax record
  deleteRecord: async (token, recordId) => {
    const response = await fetch(`/api/tax/records/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Calculate tax
  calculateTax: async (token, calculationData) => {
    const response = await fetch('/api/tax/calculate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calculationData),
    });
    return response.json();
  },
};

// Eel-specific functions (when running with Python backend)
export const eelAPI = {
  // Test Python connection
  testConnection: async () => {
    return callPythonFunction('python_function');
  },

  // Get user data via Eel
  getUserData: async (userId) => {
    return callPythonFunction('get_user_data', userId);
  },

  // Create tax record via Eel
  createTaxRecord: async (taxData) => {
    return callPythonFunction('create_tax_record_python', taxData);
  },

  // Calculate tax via Eel
  calculateTax: async (income, taxType = 'federal') => {
    return callPythonFunction('calculate_tax_python', income, taxType);
  },
};

// System functions
export const systemAPI = {
  // Health check
  healthCheck: async () => {
    const response = await fetch('/api/health');
    return response.json();
  },

  // Get API information
  getApiInfo: async () => {
    const response = await fetch('/api');
    return response.json();
  },
};

// Utility functions
export const utils = {
  // Check if running with Eel
  isEelAvailable,

  // Get stored token from localStorage
  getStoredToken: () => {
    return localStorage.getItem('taxerpay_token');
  },

  // Store token in localStorage
  storeToken: (token) => {
    localStorage.setItem('taxerpay_token', token);
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('taxerpay_token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('taxerpay_token');
    return !!token;
  },

  // Get authorization header
  getAuthHeader: () => {
    const token = localStorage.getItem('taxerpay_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },
};

// Example usage:
/*
import { authAPI, taxAPI, eelAPI, utils } from './utils/eelApi';

// Register a user
const registerUser = async () => {
  try {
    const result = await authAPI.register({
      email: 'user@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe'
    });
    console.log('Registration result:', result);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Calculate tax using Eel
const calculateTax = async () => {
  try {
    const result = await eelAPI.calculateTax(50000, 'federal');
    console.log('Tax calculation:', result);
  } catch (error) {
    console.error('Tax calculation failed:', error);
  }
};
*/ 