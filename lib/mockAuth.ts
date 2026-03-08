import { User } from './mockBlogData';

const AUTH_STORAGE_KEY = 'claritypath_auth_user';

export function login(email: string, password: string): User | null {
  // Mock login - in real app, this would call an API
  if (email && password) {
    const user: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: `/avatars/default.jpg`,
      bio: 'New member of the ClarityPath community',
      memberSince: new Date().toISOString().split('T')[0]
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }

    return user;
  }
  return null;
}

export function register(name: string, email: string, password: string): User | null {
  // Mock registration
  if (name && email && password) {
    const user: User = {
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      avatar: `/avatars/default.jpg`,
      bio: 'New member of the ClarityPath community',
      memberSince: new Date().toISOString().split('T')[0]
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }

    return user;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
