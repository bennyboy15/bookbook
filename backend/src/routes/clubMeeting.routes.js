import express from "express";
import { createClubMeeting, getClubMeeting, updateClubMeeting, deleteClubMeeting } from "../controllers/clubMeeting.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router({mergeParams:true});

// /club/:id/meetings/
router.post("/", protectRoute, createClubMeeting);

// /club/:id/meetings/:meeting
router.put("/:meetingId", protectRoute, updateClubMeeting);
router.get("/:meetingId", protectRoute, getClubMeeting);
router.delete("/:meetingId", protectRoute, deleteClubMeeting);

export default router;