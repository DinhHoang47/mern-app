import axios from "axios";

const url = "https://my-memories-api.onrender.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const editPost = (id, post) => {
  return axios.patch(`${url}/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
};
