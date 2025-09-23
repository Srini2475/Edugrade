import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('edu-ai-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher') => {
    // Mock authentication - replace with real auth later
    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name: role === 'student' ? 'John Doe' : 'Professor Smith',
      role
    };
    
    setUser(mockUser);
    localStorage.setItem('edu-ai-user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'teacher') => {
    // Mock signup - replace with real auth later
    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role
    };
    
    setUser(mockUser);
    localStorage.setItem('edu-ai-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu-ai-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}