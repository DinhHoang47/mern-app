import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import { useDispatch } from "react-redux";
import { useState } from "react";
import memoriesImg from "./images/memory-loss.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import useStyle from "./styles";

import { getPosts } from "./actions/posts";

const App = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const classes = useStyle();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memoriesImg}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item xs={12} md={7}>
              <Posts setSelectedCardId={setSelectedCardId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form
                setSelectedCardId={setSelectedCardId}
                selectedCardId={selectedCardId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
