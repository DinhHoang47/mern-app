import React from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import useStyle from "./styles";
import memoriesImg from "../../images/memory-loss.png";
import { LOGOUT } from "../../constants/actionTypes";

export default function NavBar() {
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state) => state.profile);

  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT });
    messageApi.success("Logged out.");
  };
  return (
    <>
      {contextHolder}
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
          {Object.keys(user).length !== 0 ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.name}
                src={user?.picture}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.name}
              </Typography>
              <Button
                onClick={(e) => logout(e)}
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
    </>
  );
}
