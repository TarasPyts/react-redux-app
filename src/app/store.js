import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import postReducer from '../features/postSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer,
    post: postReducer,
  },
});
