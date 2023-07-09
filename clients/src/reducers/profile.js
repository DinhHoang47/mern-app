import { AUTH, LOGOUT, LOGIN_USER } from "../constants/actionTypes";
import { user } from "../services/localServices";
export default (profile = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...profile, ...JSON.parse(user.get()).profile };
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
