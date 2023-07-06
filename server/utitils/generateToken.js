import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, "mystring", { expiresIn: "5d" });
};
