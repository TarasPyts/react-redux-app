import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPost = createAsyncThunk('post/fetchPost', async (postId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
});

export const fetchComments = createAsyncThunk(
  'post/fetchComments',
  async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async ({ postId, commentId }) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );
      return commentId;
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  }
);

export const editComment = createAsyncThunk(
  'post/editComment',
  async ({ commentId, editedComment }) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`,
        editedComment
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to edit comment');
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const editedComment = action.payload;
        state.comments = state.comments.map((comment) =>
          comment.id === editedComment.id
            ? { ...comment, body: editedComment.body }
            : comment
        );
      });
  },
});

export default postSlice.reducer;
