import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  data: null,
  loading: '',
  error: '',
};

export const authLogin = createAsyncThunk('posts/authLogin', async (requestData) => {
  const response = await axios.post('/auth/login', { ...requestData });
  return response.data;
});

export const authRegistration = createAsyncThunk('posts/authRegistration', async (requestData) => {
  const response = await axios.post('/auth/register', { ...requestData });
  return response.data;
});

export const authMe = createAsyncThunk('posts/authMe', async () => {
  const data = await axios.get('/auth/me');
  return data.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder.addCase(authLogin.pending, (state) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(authRegistration.pending, (state) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authRegistration.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authRegistration.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(authMe.pending, (state) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(authMe.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectIsAuth = (state) => !!state.authSlice.data;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
