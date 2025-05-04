
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'teacher' | 'admin';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  semester?: string;
  branch?: string;
  department?: string;
  subjects?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<UserData, 'id'>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('campusBuzzUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get users from localStorage
      const usersJson = localStorage.getItem('campusBuzzUsers') || '[]';
      const users = JSON.parse(usersJson);
      
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Don't store the password in the session
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in localStorage and state
      localStorage.setItem('campusBuzzUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<UserData, 'id'>, password: string) => {
    setIsLoading(true);
    try {
      // Get existing users
      const usersJson = localStorage.getItem('campusBuzzUsers') || '[]';
      const users = JSON.parse(usersJson);
      
      // Check if user already exists
      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user with ID
      const newUser = {
        ...userData,
        id: `user_${Date.now()}`,
        password // In a real app, this would be hashed
      };
      
      // Save updated users list
      localStorage.setItem('campusBuzzUsers', JSON.stringify([...users, newUser]));
      
      // Login the user after signup
      await login(userData.email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('campusBuzzUser');
    setUser(null);
    navigate('/auth');
  };

  const updateUser = (data: Partial<UserData>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('campusBuzzUser', JSON.stringify(updatedUser));
    
    // Also update the user in the users array
    const usersJson = localStorage.getItem('campusBuzzUsers') || '[]';
    const users = JSON.parse(usersJson);
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...data } : u
    );
    localStorage.setItem('campusBuzzUsers', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
