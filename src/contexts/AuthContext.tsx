
import React, { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { loginUser, signupUser, logout, loadUser } from '../store/slices/authSlice';

interface User {
  name: string;
  email: string;
  role: 'employee' | 'admin' | 'college';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Try to load user from localStorage on app start
    dispatch(loadUser());
  }, [dispatch]);

  const signup = async (name: string, email: string, password: string, role: User['role']): Promise<boolean> => {
    try {
      await dispatch(signupUser({ name, email, password, role })).unwrap();
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout: handleLogout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
