export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      const currentPosts = [...posts];
      return currentPosts.concat(action.payload);
    case "EDIT":
      const postId = action.payload._id;
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, ...action.payload };
        }
        return post;
      });
      return updatedPosts;
    default:
      return posts;
  }
};
