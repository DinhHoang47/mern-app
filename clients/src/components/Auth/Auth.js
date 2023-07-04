import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyle from "./styles";
import Input from "./Input";
import { AUTH } from "../../constants/actionTypes";

export default function Auth() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const state = null;
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSwitchSignUp = () => {
    setIsSignUp((preState) => !preState);
    setShowPassword(false);
  };

  const handleLoginWithGoogle = (res) => {
    const { credential, clientId } = res;
    const userInfo = jwt_decode(credential);
    dispatch({ type: AUTH, payload: { userInfo, clientId } });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
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
              type={showPassword ? "password" : "text"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup ? (
              <Input
                name={"confirmPassword"}
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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLoginWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
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
  );
}
