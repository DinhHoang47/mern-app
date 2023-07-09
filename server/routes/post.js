import express from "express";

import {
  getPosts,
  createPost,
  editPost,
  deletePost,
  likePost,
} from "../controllers/post.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
