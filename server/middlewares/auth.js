import User from "../models/user.js";
import { verifyToken } from "../utitils/verifyToken.js";

export const auth = async (req, res, next) => {
  // get the token
  const token = req.headers.authorization?.split(" ")[1];
  // verify user
  try {
    if (token) {
      // get decoded user data
      const decoded = verifyToken(token);
      const userId = await User.findById(decoded._id).select("_id");
      req.userId = userId;
      next();
    } else {
      const err = new Error("Token expired/invalid");
      throw err;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
