import express from "express";

import { getPosts, createPost, editPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", editPost);

export default router;
