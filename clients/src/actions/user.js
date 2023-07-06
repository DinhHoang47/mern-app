import * as api from "../api";

export const signIn = (userData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    console.log(data);
  } catch (error) {}
};
