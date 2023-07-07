import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  name: String,
  firstname: String,
  lastname: String,
  picture: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  iss: String,
});
// Hash password before saving user information

userSchema.pre("save", async function (next) {
  // Check the password incase edit user information, it mean that the password don't need to be rehash
  if (!this.isModified("password")) {
    next();
  }
  // Incase create new user ( password is modified)
  // Generates salt value for hash password ( salt make password unique and difficult to crack)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define a password verify method for User
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
