import { FETCH_ALL, CREATE, DELETE, EDIT } from "../constants/actionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case EDIT:
      const postId = action.payload._id;
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, ...action.payload };
        }
        return post;
      });
      return updatedPosts;
    case DELETE:
      const deletePostId = action.payload;
      const newPosts = posts.filter((post) => post._id !== deletePostId);
      return newPosts;
    default:
      return posts;
  }
};
