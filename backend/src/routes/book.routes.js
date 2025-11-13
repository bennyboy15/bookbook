import express from "express";
import { createBookReview } from "../controllers/book.controller";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, createBookReview);

export default router;