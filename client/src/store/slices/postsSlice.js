import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  sort: 'new',
  posts: {
    data: [],
    loading: '',
    error: '',
  },
  tags: {
    data: [],
    loading: '',
    error: '',
  },
};

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (sort) => {
  const data = await axios.get('/posts/' + sort);
  return data.data;
});

export const fetchAllTags = createAsyncThunk('posts/fetchAllTags', async () => {
  const data = await axios.get('/tags');
  return data.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.posts.data = [];
      state.posts.loading = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts.data = action.payload;
      state.posts.loading = false;
    });
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.posts.loading = false;
    });
    builder.addCase(fetchAllTags.pending, (state) => {
      state.tags.data = [];
      state.tags.loading = true;
    });
    builder.addCase(fetchAllTags.fulfilled, (state, action) => {
      state.tags.data = action.payload;
      state.tags.loading = false;
    });
    builder.addCase(fetchAllTags.rejected, (state) => {
      state.tags.loading = false;
    });
  },
});

export const { setSort } = postSlice.actions;
export default postSlice.reducer;
