import express from "express";

import {
  getPostsBySearch,
  getPosts,
  createPost,
  editPost,
  deletePost,
  likePost,
  getPost,
  commentPost,
} from "../controllers/post.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", auth, likePost);
router.patch("/:id/commentPost", auth, commentPost);

export default router;
