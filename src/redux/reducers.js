const initialState = {
  users: [],
  posts: [],
  post: null,
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        post: null,
        comments: [],
      };
    case 'UPDATE_POST':
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
