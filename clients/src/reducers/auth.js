import { AUTH, LOGOUT } from "../constants/actionTypes";
export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};
