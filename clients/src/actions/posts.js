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
import * as api from "../api";

// Actions creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (queryParams) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getPostsBySearch(queryParams);
    dispatch({ type: FETCH_SEARCH_DATA, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`);
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

export const commentPost = (id, comment, setComment) => {
  return async (dispatch) => {
    try {
      // data is post that have new updated comment array with new comment
      const { data } = await api.commentPost(id, comment);
      dispatch({ type: ADD_COMMENT, payload: data });
      setComment("");
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };
};
