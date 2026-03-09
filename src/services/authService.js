/**
 * Authentication Service
 * Handles all API calls related to user authentication using Fake Store API
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Perform login request to Fake Store API
 * @param {string} username - User login name
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response object with token or error
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Credenciais inválidas');
    }

    return data; // Expected: { token: '...' }
  } catch (error) {
    console.error('[authService] Login error:', error);
    throw error;
  }
};
