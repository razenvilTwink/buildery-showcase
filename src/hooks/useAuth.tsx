
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Проверка сессии при загрузке
  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ваш-api.vercel.app';
    fetch(`${BASE_URL}/api/check-auth`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.username) setUser({ username: data.username });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ваш-api.vercel.app';
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = async () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ваш-api.vercel.app';
    await fetch(`${BASE_URL}/api/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
