import {
  FETCH_ALL,
  CREATE,
  DELETE,
  EDIT,
  FETCH_SEARCH_DATA,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  ADD_COMMENT,
} from "../constants/actionTypes";
export default (state = { posts: [], isLoading: true, post: {} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case FETCH_SEARCH_DATA:
      return { ...state, posts: action.payload };
    case CREATE:
      const newArray = [...state.posts];
      newArray.unshift(action.payload);
      return { ...state, posts: newArray };
    case EDIT:
      const postId = action.payload._id;
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          return { ...post, ...action.payload };
        } else {
          return post;
        }
      });
      return { ...state, posts: updatedPosts };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
      };
    case DELETE:
      const deletePostId = action.payload;
      const newPosts = state.posts.filter((post) => post._id !== deletePostId);
      return { ...state, posts: newPosts };
    default:
      return state;
  }
};
