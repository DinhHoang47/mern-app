import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyle from "./styles";
import FileBase from "react-file-base64";

import { useDispatch } from "react-redux";
import { createPost, editPost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Form({ selectedCardId, setSelectedCardId }) {
  const classes = useStyle();
  const navigate = useNavigate();
  const editingPost = useSelector((state) =>
    selectedCardId
      ? state.posts.posts.find((post) => post._id === selectedCardId)
      : null
  );

  // Get current loggin user
  const loginUser = useSelector((state) => state.profile);
  // Check if user is loggin or not

  const postDataSchema = {
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };
  const [postData, setPostData] = useState(postDataSchema);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = loginUser.name;
    if (selectedCardId) {
      dispatch(editPost(selectedCardId, { ...postData, name: userName }));
    } else {
      dispatch(createPost({ ...postData, name: userName }, navigate));
    }
    clear();
  };

  const clear = () => {
    setPostData(postDataSchema);
    setSelectedCardId(null);
  };

  useEffect(() => {
    if (editingPost) {
      setPostData(editingPost);
    }
  }, [editingPost]);
  if (Object.keys(loginUser).length === 0) {
    return (
      <Paper elevation={6} className={classes.paper}>
        <Typography variant="h6">Login to create your own post</Typography>
      </Paper>
    );
  } else {
    return (
      <Paper elevation={6} className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {!selectedCardId ? "Create" : "Edit"} a Memory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            value={postData.title}
          ></TextField>
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            value={postData.message}
          ></TextField>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            value={postData.tags}
          ></TextField>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            ></FileBase>
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
}

export default Form;
