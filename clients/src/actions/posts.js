import * as api from "../api";

// Actions creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREAT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editPost = (id, post) => {
  console.log(post);
  return async (dispatch) => {
    try {
      const { data } = await api.editPost(id, post);
      dispatch({ type: "EDIT", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
