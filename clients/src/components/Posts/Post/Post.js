import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyle from "./styles";
import moment from "moment";
import noImg from "../../../images/no-image-200.svg";
import { deletePost, likePost } from "../../../actions/posts";
import { Link, useNavigate } from "react-router-dom";

function Post({ post, setSelectedCardId }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes);
  const loginUser = useSelector((state) => state.profile);
  const liked = likes.includes(loginUser._id);
  const isLogin = Object.keys(loginUser).length;

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  const handlelikePost = (id) => {
    // Dispatch action first
    dispatch(likePost(id));
    // If current id have in like array then remove else push it to array
    if (liked) {
      setLikes(likes.filter((item) => item !== loginUser._id));
      // If current id is not existed in current array
    } else {
      setLikes([...likes, loginUser._id]);
    }
  };

  const Like = () => {
    // Display like when user is login
    if (isLogin) {
      //If this post is not liked
      if (!liked) {
        const likeCount = likes.length;
        return (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handlelikePost(post._id);
            }}
            className={classes.likeButton}
          >
            <ThumbUpOffAltIcon fontSize="small" />
            {likeCount > 0 ? likeCount : ""}
          </Button>
        );
        // If login user liked this post
      } else {
        const likeCount = likes.length;
        // If likeCount > 2 then display with format "You and {likeCount}"
        if (likeCount > 2) {
          return (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handlelikePost(post._id);
              }}
              className={classes.likeButton}
            >
              <ThumbUpAltIcon fontSize="small" />
              <span>You & {likeCount - 1} others</span>
            </Button>
          );
          // If likeCount < 2 then display with format "{likeCount}"
        } else {
          return (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handlelikePost(post._id);
              }}
              className={classes.likeButton}
            >
              <ThumbUpAltIcon fontSize="small" />
              {likeCount >= 1 ? likeCount : ""}
            </Button>
          );
        }
      }
      // Display like when user not loggin
    } else {
      const likeCount = likes.length;
      return (
        <Button
          onClick={() => {
            navigate("/auth");
          }}
          size="small"
          color="primary"
          className={classes.likeButton}
        >
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp;
          {likeCount !== 0 ? likeCount : ""}
        </Button>
      );
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <Link
        to={`/posts/${post._id}`}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile || noImg}
          title={post.title}
        ></CardMedia>
        <div className={classes.overlay}>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            variant="h6"
          >
            {post.name}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {loginUser._id === post.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCardId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
          className={classes.title}
          variant="h5"
          gutterBottom
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.message}
          </Typography>
        </CardContent>
      </Link>

      <CardActions className={classes.cardActions}>
        <Like />
        {loginUser._id === post.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              handleDelete(post._id);
            }}
            className={classes.deleteButton}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
