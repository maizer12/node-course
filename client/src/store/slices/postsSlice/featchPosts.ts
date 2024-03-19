import axios from '../../../axios';
import qs from 'qs';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (params: any) => {
  const { sort, tag } = params;
  const linkSearch = qs.stringify({ sort, tag });
  const data = await axios.get('/posts?' + linkSearch);
  return data.data;
});

export const fetchAllTags = createAsyncThunk('posts/fetchAllTags', async () => {
  const data = await axios.get('/tags');
  return data.data;
});
