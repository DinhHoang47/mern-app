import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";

import useStyle from "./style";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

export default function CommentSection({ post }) {
  const classes = useStyle();
  const lastComment = useRef(null);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const handleComment = async (id) => {
    const comments = await dispatch(commentPost(id, comment, setComment));
    setComments(comments);
    lastComment.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(":")[0]}</strong>
              <br />
              {comment.split(":").slice(2).join(":")}
            </Typography>
          ))}
          <div ref={lastComment} />
        </div>
        <div style={{ width: "50%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            maxRows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
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
