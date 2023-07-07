import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn =
  (userData, navigate, openMessage, closeMessage) => async (dispatch) => {
    try {
      // Trigger loading
      openMessage();
      // Get user data
      const { data } = await api.signIn(userData);
      // Set user data to local
      dispatch({ type: AUTH, payload: data });
      closeMessage();
      navigate("/");
    } catch (error) {
      console.log(error);
      closeMessage("error", error.response?.data.message);
    }
  };

export const signUp =
  (userData, openMessage, closeMessage, setIsSignup) => async (dispatch) => {
    try {
      // Trigger loading
      openMessage();
      // Close loadin, throw success message
      closeMessage("success", "Sign-up successful.");
      setTimeout(() => {
        setIsSignup(false);
      }, 1500);
    } catch (error) {
      closeMessage("error", error.response?.data.message);
    }
  };

export const googleSignIn =
  (response, navigate, openMessage, closeMessage) => async (dispatch) => {
    try {
      openMessage();
      const { data } = await api.googleSignIn(response);
      dispatch({ type: AUTH, payload: data });
      closeMessage("success", "Sign-in successful.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      closeMessage("error", error.response?.data.message);
    }
  };
