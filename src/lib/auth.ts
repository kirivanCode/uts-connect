// Auth helper functions
const TOKEN_KEY = 'uts_auth_token';
const ROLE_KEY = 'uts_user_role';
const NAME_KEY = 'uts_user_name';

export const saveAuthData = (token: string, role: string, name?: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  if (name) localStorage.setItem(NAME_KEY, name);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};

export const getUserName = (): string | null => {
  return localStorage.getItem(NAME_KEY);
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
