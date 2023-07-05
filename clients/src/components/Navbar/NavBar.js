import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useStyle from "./styles";
import memoriesImg from "../../images/memory-loss.png";
import { Button } from "@material-ui/core";

export default function NavBar() {
  const classes = useStyle();
  const [user, setUser] = useState(null);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          to="/"
          component={Link}
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memoriesImg}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.profile.name}
              src={user.profile.imageUrl}
            >
              {user.profile.name.chartAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.profile.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
