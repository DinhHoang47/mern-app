import React from "react";

import { useDispatch } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyle from "./styles";
import moment from "moment";
import noImg from "../../../images/no-image-200.svg";
import { deletePost, likePost } from "../../../actions/posts";

function Post({ post, setSelectedCardId }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  const handlelikePost = (id) => {
    dispatch(likePost(id));
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile || noImg}
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setSelectedCardId(post._id)}
        >
          <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
        </Button>
      </div>
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
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handlelikePost(post._id);
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
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
      </CardActions>
    </Card>
  );
}

export default Post;
