import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStyle from "./styles";
import memoriesImg from "../../images/memory-loss.png";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

export default function NavBar() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  };
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
              alt={user?.profile.name}
              src={user?.profile.picture}
            >
              {user?.profile.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.profile.name}
            </Typography>
            <Button
              onClick={logout}
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
