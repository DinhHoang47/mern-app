import React, { useEffect } from "react";
import { useState } from "react";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import useStyle from "./styles";

export default function Home() {
  const classes = useStyle();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
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
  );
}
