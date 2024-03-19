import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPosts, fetchAllTags } from './featchPosts';
import { IPostsSliceState } from './postsSlice.type';

const initialState: IPostsSliceState = {
  sort: 'new',
  posts: {
    data: [],
    loading: '',
    error: '',
  },
  tags: {
    data: null,
    loading: '',
    error: '',
  },
  isModalCreate: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCreateModal: (state, action: { payload: boolean }) => {
      state.isModalCreate = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.pending, (state: any) => {
      state.posts.data = [];
      state.posts.loading = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state: any, action) => {
      state.posts.data = action.payload;
      state.posts.loading = false;
    });
    builder.addCase(fetchAllPosts.rejected, (state: any) => {
      state.posts.loading = false;
    });
    builder.addCase(fetchAllTags.pending, (state: any) => {
      state.tags.data = [];
      state.tags.loading = true;
    });
    builder.addCase(fetchAllTags.fulfilled, (state: any, action) => {
      state.tags.data = action.payload;
      state.tags.loading = false;
    });
    builder.addCase(fetchAllTags.rejected, (state: any) => {
      state.tags.loading = false;
    });
  },
});

export const { setSort, setCreateModal } = postSlice.actions;
export default postSlice.reducer;
