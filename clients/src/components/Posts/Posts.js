import React from "react";
import Post from "../Posts/Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import useStyle from "./styles";

import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

function Posts({ setSelectedCardId }) {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!isLoading && posts.length === 0) {
    return (
      <Paper elevation={1}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Posts not found !
        </Typography>
      </Paper>
    );
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post, index) => (
        <Grid key={index + 1} item xs={12} sm={12} md={4} lg={3}>
          <Post setSelectedCardId={setSelectedCardId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
