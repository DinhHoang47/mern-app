import { AUTH, LOGOUT } from "../constants/actionTypes";
export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action.payload);
      return { ...state, authData: action.payload };

    default:
      return state;
  }
};
