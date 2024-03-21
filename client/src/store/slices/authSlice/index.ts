import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../';
import { authLogin, authRegistration, authMe } from './fethAuth';
import { IAuthState } from './authSlice.types';

const initialState: IAuthState = {
  data: null,
  loading: false,
  error: '',
};

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
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action: { payload: any }) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(authRegistration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authRegistration.fulfilled, (state, action: { payload: any }) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authRegistration.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(authMe.pending, (state) => {
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

export const selectIsAuth = (state: RootState) => !!state.authSlice.data;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
