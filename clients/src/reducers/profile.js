import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = JSON.parse(localStorage.getItem("profile"))?.profile || {};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, ...action.payload.profile };
    case LOGOUT:
      localStorage.removeItem("profile");
      return {};
    default:
      return state;
  }
};
