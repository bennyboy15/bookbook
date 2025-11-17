import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getFollowers, followUser, unfollowUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/followers/:id", protectRoute, getFollowers);
router.post("/follow/:id", protectRoute, followUser);
router.delete("/follow/:id", protectRoute, unfollowUser);

export default router;