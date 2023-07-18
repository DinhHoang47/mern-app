import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import * as api from "../../api/index";

import useStyle from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CommentSection({ post }) {
  const classes = useStyle();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.profile);
  const isLogin = Object.keys(user).length !== 0;
  const handleComment = async (id) => {
    try {
      // Get the element that wrapping the comments
      const scrollEl = ref.current;
      // Get the comment for api
      const {
        data: { comments: updatedComments },
      } = await api.commentPost(id, comment);
      // Set updated comments
      setComments(updatedComments);
      // Clear input field
      setComment("");
      // Scroll to the lastest comment
      // Add setTimeout because of an issue of Chronium browser following this https://github.com/facebook/react/issues/23396
      setTimeout(() => {
        scrollEl.scroll({ top: scrollEl.scrollHeight, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickTextField = () => {
    if (!isLogin) {
      navigate("/auth");
    }
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <div className={classes.commentsContainer} ref={ref}>
            {comments?.map((comment, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{comment.split(":")[0]}</strong>
                <br />
                {comment.split(":").slice(2).join(":")}
              </Typography>
            ))}
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            maxRows={4}
            variant="outlined"
            label={isLogin ? "Comment" : "Login to write your comment"}
            multiline
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onClick={handleClickTextField}
          />
          <Button
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={() => {
              handleComment(post._id);
            }}
            disabled={!comment}
            variant="contained"
            fullWidth
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
