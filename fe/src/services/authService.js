import { request } from './apiClient';

const TOKEN_KEY = 'tl_admin_token';
const USER_KEY = 'tl_admin_user';

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function loginAdmin(username, password) {
  const res = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  const data = res.data || res;
  if (data?.accessToken) {
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
  return data;
}

export async function verifySession() {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await request('/api/auth/me');
    const user = res.data || res;
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return user;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function logoutAdmin() {
  clearAuthSession();
}
