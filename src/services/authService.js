/**
 * Authentication service.
 * Handles API calls related to user authentication.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();

/**
 * Perform login request.
 * @param {string} username - User login name.
 * @param {string} password - User password.
 * @returns {Promise<{token: string}>}
 */
export const login = async (username, password) => {
  try {
    if (!BASE_URL) {
      throw new Error('VITE_API_BASE_URL não configurada.');
    }

    // Preserve base path (e.g. https://api.com/v1) and avoid double slash.
    const normalizedBaseUrl = BASE_URL.replace(/\/+$/, '');
    const response = await fetch(`${normalizedBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const rawBody = await response.text();
    let data = null;

    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.msg || 'Credenciais inválidas.');
    }

    if (!data?.token) {
      throw new Error('Resposta de autenticação inválida.');
    }

    return data;
  } catch (error) {
    console.error('[authService] Login error:', error);
    throw error;
  }
};
