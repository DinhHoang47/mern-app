import React from "react";
import Post from "../Posts/Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import useStyle from "./styles";

import { useSelector } from "react-redux";

function Posts({ setSelectedCardId }) {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post, index) => (
        <Grid key={index + 1} item xs={12} sm={6}>
          <Post setSelectedCardId={setSelectedCardId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
