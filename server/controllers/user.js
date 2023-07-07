import User from "../models/user.js";
import { generateToken } from "../utitils/generateToken.js";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utitils/verifyGoogleToken.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email exists
  const user = await User.findOne({ email });
  if (!user || user.iss != process.env.SITE_NAME) {
    return res.status(404).json({ message: "Invalid login credential" });
  }
  if (user && (await user.verifyPassword(password))) {
    const { password, ...rest } = user.toObject();
    return res.status(200).json({
      token: generateToken(user._id),
      profile: rest,
    });
  } else {
    return res.status(404).json({ message: "Invalid login credential" });
  }
};

export const signUp = async (req, res, next) => {
  // Retrive user information from req object
  const { firstname, lastname, password, confirmpassword, email } = req.body;
  const name = `${firstname} ${lastname}`;
  try {
    // Check if email already exits
    const isUserExits = await User.findOne({ email });
    if (isUserExits)
      return res.status(404).json({ message: "User already exist." });
    if (password !== confirmpassword)
      return res.status(400).json({ message: "Passwords don't match." });
    // Define issuer as Site Name when sign in with google
    const iss = process.env.SITE_NAME;
    const data = await User.create({
      firstname,
      lastname,
      name,
      password,
      email,
      iss,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Something when wrong" });
  }
};

export const googleSignIn = async (req, res, next) => {
  try {
    const { credential } = req.body;
    // Decode credential form google
    const decoded = await verifyGoogleToken(credential);
    const { email, name, given_name, family_name, picture } = decoded;
    // Check if email exist on db
    const userExist = await User.findOne({ email });

    // If user have create account with email and password return message
    if (userExist && userExist.iss == process.env.SITE_NAME)
      return res.status(400).json({
        message: "This email have been registered with email and password.",
      });
    // If user exist and created with google account
    if (userExist && userExist.iss == process.env.GOOGLE_ISS) {
      const { password, ...rest } = userExist.toObject();
      return res.status(200).json({
        token: generateToken(userExist._id),
        profile: rest,
      });
      // If user not exist create new user
    } else {
      const newUser = {
        email,
        name,
        firstname: given_name,
        lastname: family_name,
        iss: process.env.GOOGLE_ISS,
        picture,
      };
      const newGoogleUser = await User.create(newUser);
      return res
        .status(201)
        .json({ token: generateToken(newGoogleUser._id), profile: data });
    }
  } catch (error) {
    console.log(error);
  }
};
