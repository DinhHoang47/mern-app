import { AUTH, LOGOUT, LOGIN_USER } from "../constants/actionTypes";
export default (profile = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...profile, ...action.payload.profile };
    case LOGOUT:
      localStorage.removeItem("profile");
      return {};
    default:
      return profile;
  }
};
