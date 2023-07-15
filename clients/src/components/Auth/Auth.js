import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { message } from "antd";

import useStyle from "./styles";
import Input from "./Input";
import { googleSignIn, signIn, signUp } from "../../actions/user";

export default function Auth() {
  console.log("Auth executed");
  const classes = useStyle();
  const loginUser = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Declare handleCredentialResponse everytime component render
    window.handleCredentialResponse = handleCredentialResponse;
    // Insert script tag into DOM every time the component renders.
    // This prevents the component from disappearing when navigating away
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      // Clean up the assignment when the component unmounts
      delete window.handleCredentialResponse;
      // Remove script when component unmounts
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // State to control show/hide password
  const [showPassword, setShowPassword] = useState(false);
  // State for control form type sign-in/sign-up
  const [isSignup, setIsSignUp] = useState(false);
  // Handle to get form data
  const initialForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle sign-in sign-up
  // Message when loading
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
  };
  const closeMessage = (type = "info", message = "Finished !") => {
    messageApi.open({
      key,
      type,
      content: message,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, openMessage, closeMessage, setIsSignUp));
    } else {
      dispatch(signIn(formData, navigate, openMessage, closeMessage));
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSwitchSignUp = () => {
    setIsSignUp((preState) => !preState);
    setShowPassword(false);
  };

  const handleCredentialResponse = (response) => {
    dispatch(googleSignIn(response, navigate, openMessage, closeMessage));
  };

  return (
    <>
      {contextHolder}
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup ? (
                <>
                  <Input
                    name={"firstname"}
                    label={"First Name"}
                    handleChange={handleChange}
                    haft
                    autoFocus
                  />
                  <Input
                    name={"lastname"}
                    label={"Last Name"}
                    handleChange={handleChange}
                    haft
                  />
                </>
              ) : null}
              <Input
                name={"email"}
                label={"Email Address"}
                handleChange={handleChange}
                type={"email"}
              />
              <Input
                name={"password"}
                label={"Password"}
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />

              {isSignup ? (
                <Input
                  name={"confirmpassword"}
                  label="Repeat Password"
                  handleChange={handleChange}
                  type={"password"}
                />
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <Button>
            <div
              id="g_id_onload"
              data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              data-callback="handleCredentialResponse"
              data-auto_prompt="false"
            ></div>
            <div
              className="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            ></div>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={handleSwitchSignUp}>
                {isSignup
                  ? "Already have an account ? SIGN IN"
                  : "Not have an account ? SIGN UP"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
