import express from "express";
import { createClubMeeting,getClubMeeting } from "../controllers/clubMeeting.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router({mergeParams:true});

router.post("/", protectRoute, createClubMeeting);
router.get("/:meeting", protectRoute, getClubMeeting);

export default router;