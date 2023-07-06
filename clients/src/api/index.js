import axios from "axios";

// const url = "https://my-memories-api.onrender.com/posts";
const mainUrl = "http://localhost:5000";
const postUrl = `${mainUrl}/posts`;
const userUrl = `${mainUrl}/user`;

export const fetchPosts = () => axios.get(postUrl);

export const createPost = (newPost) => axios.post(postUrl, newPost);

export const editPost = (id, post) => {
  return axios.patch(`${postUrl}/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${postUrl}/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${postUrl}/${id}/likePost`);
};

export const signUp = (userData) => axios.post(userUrl, userData);
export const signIn = (userData) => axios.post(`${userUrl}/signin`, userData);
