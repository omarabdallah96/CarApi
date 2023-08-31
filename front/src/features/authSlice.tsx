// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../http/axiosApi';

// Utility function to save the token to localStorage
const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('authToken', token);
};

const loadTokenFromLocalStorage = () => {
  return localStorage.getItem('authToken');
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('authToken');
};


interface Credentials {
  username: string;
  password: string;
}
export const loginAsync = createAsyncThunk('auth/login', async (credentials: Credentials) => {
  try {
    const response = await http.post('/users/login', credentials);
    const { user, token } = response.data;
    saveTokenToLocalStorage(token); // Save the token
    return user;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('An error occurred during login.');
    }
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  console.log('logout');
  removeTokenFromLocalStorage(); // Remove the token
});

const initialState = {
  user: null,
  error: null,
  status: 'idle',
  isAuthenticated: !!loadTokenFromLocalStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeTokenFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.error.message;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
