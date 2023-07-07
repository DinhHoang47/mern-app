import express from "express";

import { googleSignIn, signIn, signUp } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/google-signin", googleSignIn);

export default router;
