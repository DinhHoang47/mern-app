import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import { Paper, CircularProgress, Divider, Typography } from "@mui/material";
import moment from "moment";

import useStyles from "./style";
import CommentSection from "./CommentSection";
import RecommendSection from "./RecommendSection";

export default function PostDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, isLoading, posts } = useSelector((state) => state.posts);

  // Get post after component mount
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  // Fetch recommended posts after get post
  useEffect(() => {
    const queryParams = { searchValue: "none", tags: post?.tags?.join(",") };
    const fetchRecommended = async () => {
      dispatch(getPostsBySearch(queryParams));
    };
    fetchRecommended();
  }, [post, dispatch]);
  const recommendedPosts = posts.filter((data) => data._id !== post._id);

  // If object is empty return null
  if (Object.keys(post).length === 0) return null;

  // If isloading return Circularprocess
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress />
      </Paper>
    );

  // Render main component
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div
            style={{ marginTop: "20px" }}
            // className={classes.recommendedPosts}
          >
            <RecommendSection recommendedPosts={recommendedPosts} />
          </div>
        </div>
      )}
    </Paper>
  );
}
