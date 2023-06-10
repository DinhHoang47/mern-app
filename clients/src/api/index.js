import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const editPost = (id, post) => {
  console.log(id, post);
  return axios.post(`${url}/${id}`, post);
};
