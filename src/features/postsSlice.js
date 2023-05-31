import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  }
);

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to add post');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectPostsByUserId = (state, userId) => {
  return state.posts.posts.filter((post) => post.userId === userId);
};

export default postsSlice.reducer;
