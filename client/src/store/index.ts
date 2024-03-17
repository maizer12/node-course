import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
