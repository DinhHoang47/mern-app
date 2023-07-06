import User from "../models/user.js";
import { generateToken } from "../utitils/generateToken.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json("Invalid login credential");
  }
  if (user && (await user.verifyPassword(password))) {
    return res.json({
      data: generateToken(user._id),
      message: "Sign in successful",
    });
  }
  try {
  } catch (error) {
    console.log(error);
  }
};
