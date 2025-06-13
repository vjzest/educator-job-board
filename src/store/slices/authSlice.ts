
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin' | 'college';
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Mock user database
const mockUsers: User[] = [];

// Mock authentication functions
const generateToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
};

const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 9);
};

// Async thunks for mock API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock database
    const existingUser = mockUsers.find(user => user.email === email);
    
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    // In a real app, you would verify the password here
    // For mock purposes, we'll just check if password is not empty
    if (!password) {
      throw new Error('Invalid password');
    }
    
    const token = generateToken();
    const data = {
      user: existingUser,
      token,
    };
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, role }: { name: string; email: string; password: string; role: 'employee' | 'admin' | 'college' }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: generateUserId(),
      name,
      email,
      role,
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    console.log('User created successfully:', newUser);
    console.log('Current mock users:', mockUsers);
    
    return { message: 'User created successfully' };
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    
    throw new Error('No user found');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Load User
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
