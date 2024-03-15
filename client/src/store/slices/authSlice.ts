import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  data: null,
  loading: '',
  error: '',
};

export const authLogin = createAsyncThunk('posts/authLogin', async (requestData: any) => {
  const response = await axios.post('/auth/login', { ...requestData });
  return response.data;
});

export const authRegistration = createAsyncThunk('posts/authRegistration', async (requestData: any) => {
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
    builder.addCase(authLogin.pending, (state: any) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state: any, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state: any) => {
      state.loading = false;
    });
    builder.addCase(authRegistration.pending, (state: any) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authRegistration.fulfilled, (state: any, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authRegistration.rejected, (state: any) => {
      state.loading = false;
    });
    builder.addCase(authMe.pending, (state: any) => {
      state.data = [];
      state.loading = true;
    });
    builder.addCase(authMe.fulfilled, (state: any, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(authMe.rejected, (state: any) => {
      state.loading = false;
    });
  },
});

export const selectIsAuth = () => !!localStorage.getItem('token');

export const { logout } = authSlice.actions;

export default authSlice.reducer;
