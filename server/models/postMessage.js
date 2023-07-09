import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [],
  selectedFile: String,
  like: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
