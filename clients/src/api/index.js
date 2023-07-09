import axios from "axios";
import { user } from "../services/localServices";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

API.interceptors.request.use((req) => {
  const loginUser = JSON.parse(user.get());
  if (loginUser) {
    req.headers.Authorization = `Bearer ${loginUser.token}`;
  }
  return req;
});

// const url = "https://my-memories-api.onrender.com/posts";

export const fetchPosts = () => {
  return API.get("/posts");
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

// User APIS

// Sign-up API

export const signUp = (userData) => API.post(`user/signup`, userData);

// Sign-in API

export const signIn = (userData) => API.post(`user/signin`, userData);

// Sign-in with Google API

export const googleSignIn = (credential) =>
  API.post(`user/google-signin`, credential);
