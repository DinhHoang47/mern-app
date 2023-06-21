import { FETCH_ALL, CREATE, DELETE, EDIT } from "../constants/actionTypes";
import * as api from "../api";

// Actions creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editPost = (id, post) => {
  return async (dispatch) => {
    try {
      const { data } = await api.editPost(id, post);
      dispatch({ type: EDIT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: EDIT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
