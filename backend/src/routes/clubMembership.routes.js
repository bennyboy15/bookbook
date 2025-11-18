import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getClubMembers, addClubMember, removeClubMember, updateClubRole } from "../controllers/clubMembership.controller.js";

const router = express.Router({mergeParams:true});

// /club/:id/members
router.get("/", protectRoute, getClubMembers);
router.post("/:userId", protectRoute, addClubMember);
router.delete("/:userId", protectRoute, removeClubMember);
router.patch("/:userId", protectRoute, updateClubRole);

export default router;