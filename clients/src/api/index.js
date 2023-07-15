import axios from "axios";
import { user } from "../services/localServices";
import jwt_decode from "jwt-decode";
import { LOGOUT } from "../constants/actionTypes";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

let store;
export const injectStore = (_store) => {
  store = _store;
};

API.interceptors.request.use((req) => {
  const loginUser = JSON.parse(user.get());

  if (loginUser) {
    const expiredIn = jwt_decode(loginUser.token).exp * 1000;
    if (expiredIn < Date.now()) {
      store.dispatch({ type: LOGOUT });
      window.alert("Token expired. Please loggin again.");
    } else {
      req.headers.Authorization = `Bearer ${loginUser.token}`;
    }
  }
  return req;
});

// const url = "https://my-memories-api.onrender.com/posts";

// Posts API

export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};

export const getPostsBySearch = (queryParams) => {
  return API.get(
    `/posts/search?searchQuery=${queryParams.searchValue || "none"}&tags=${
      queryParams.tags
    }`
  );
};

export const createPost = (newPost) => API.post("/posts", newPost);

export const editPost = (id, post) => {
  return API.patch(`/posts/${id}`, post);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const commentPost = (id, comment) => {
  return API.patch(`/posts/${id}/commentPost`, { comment });
};

// Post API

export const getPost = (id) => {
  return API.get(`/posts/${id}`);
};

// User APIS

// Sign-up API

export const signUp = (userData) => API.post(`user/signup`, userData);

// Sign-in API

export const signIn = (userData) => API.post(`user/signin`, userData);

// Sign-in with Google API

export const googleSignIn = (credential) =>
  API.post(`user/google-signin`, credential);
