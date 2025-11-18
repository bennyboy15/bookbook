import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getClubs, createClub, getSpecificClub, updateClub, deleteClub } from "../controllers/club.controller.js";
import membershipRoutes from "./clubMembership.routes.js";

const router = express.Router();

// /club
router.get("/", protectRoute, getClubs);            // list all clubs
router.post("/", protectRoute, createClub);         // create a new club

// /club/:id
router.get("/:id", protectRoute, getSpecificClub);   // single club details
router.put("/:id", protectRoute, updateClub);        // update club info
router.delete("/:id", protectRoute, deleteClub);     // delete club

router.use("/:id/members", membershipRoutes);

export default router;