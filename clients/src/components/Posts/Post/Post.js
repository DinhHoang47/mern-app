import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyle from "./styles";
import moment from "moment";
import noImg from "../../../images/no-image-200.svg";
import { deletePost, likePost } from "../../../actions/posts";
import { Link } from "react-router-dom";

function Post({ post, setSelectedCardId }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  const handlelikePost = (id) => {
    dispatch(likePost(id));
  };
  const loginUser = useSelector((state) => state.profile);
  const Like = () => {
    // Display like when user is loggin
    if (Object.keys(loginUser).length !== 0) {
      const liked = post.likes.includes(loginUser._id);
      //If this post is not liked
      if (!liked) {
        const likeCount = post.likes.length;
        return (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handlelikePost(post._id);
            }}
          >
            <ThumbUpOffAltIcon fontSize="small" />
            {likeCount > 0 ? likeCount : ""}
          </Button>
        );
        // If this post liked
      } else {
        const likeCount = post.likes.length - 1;
        return (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handlelikePost(post._id);
            }}
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp; You &nbsp;{likeCount >= 1 ? `and ${likeCount} others` : ""}
          </Button>
        );
      }

      // Display like when user not loggin
    } else {
      const likeCount = post.likes.length;
      return (
        <Button size="small" color="primary">
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
          <Typography variant="h6">{post.name}</Typography>
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
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </Link>

      <CardActions className={classes.cardActions}>
        <Like />
        {loginUser._id === post.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handleDelete(post._id);
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
