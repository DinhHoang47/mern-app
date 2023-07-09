import { combineReducers } from "redux";
import posts from "./posts";
import profile from "./profile";
export default combineReducers({
  posts,
  profile,
});
