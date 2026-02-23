import { User, mockUsers } from './mockData';

const CURRENT_USER_KEY = 'conectaup_current_user';

export const login = (email: string, password: string): User | null => {
  // Simulación de login - en producción esto sería una llamada a la API con JWT
  const user = mockUsers.find(u => u.email === email);
  
  if (user && password === 'demo123') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: string | string[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.rol);
  }
  
  return user.rol === role;
};
