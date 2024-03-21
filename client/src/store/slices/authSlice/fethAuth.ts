import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { IUser } from '../../../models/IUser';
import { IAuthLogin } from './authSlice.types';

export const authLogin = createAsyncThunk('posts/authLogin', async (requestData: IAuthLogin) => {
  const response = await axios.post<IUser>('/auth/login', { ...requestData });
  return response.data;
});

export const authRegistration = createAsyncThunk('posts/authRegistration', async (requestData: IAuthLogin) => {
  const response = await axios.post<IUser>('/auth/register', { ...requestData });
  return response.data;
});

export const authMe = createAsyncThunk<IUser, void>('auth/authMe', async () => {
  try {
    const data = await axios.get<IUser>('/auth/me');
    return data.data;
  } catch (err) {
    throw err;
  }
});
