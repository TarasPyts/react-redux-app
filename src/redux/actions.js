import axios from 'axios';

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'GET_USERS', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPosts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      dispatch({ type: 'GET_POSTS', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getComments = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      dispatch({ type: 'GET_COMMENTS', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      dispatch({ type: 'DELETE_POST', payload: postId });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePost = (postId, updatedPost) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedPost
      );
      dispatch({ type: 'UPDATE_POST', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};
