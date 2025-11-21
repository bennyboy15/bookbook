import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getClubs, createClub, getSpecificClub, updateClub, deleteClub, getClubMembersCount } from "../controllers/club.controller.js";
import membershipRoutes from "./clubMembership.routes.js";
import meetingRoutes from "./clubMeeting.routes.js";

const router = express.Router();

// /club
router.get("/", protectRoute, getClubs);                // list all clubs
router.post("/", protectRoute, createClub);             // create a new club

// /club/:id
router.get("/:id", protectRoute, getSpecificClub);      // single club details
router.get("/:id/count", protectRoute, getClubMembersCount);// get members count
router.put("/:id", protectRoute, updateClub);           // update club info
router.delete("/:id", protectRoute, deleteClub);        // delete club

router.use("/:id/members", membershipRoutes);

router.use("/:id/meetings", meetingRoutes);

export default router;