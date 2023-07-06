import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, require: true },
  family_name: String,
  given_name: String,
  picture: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

// Define a password verify method for User

userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
