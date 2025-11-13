import express from "express";
import { createBookReview, getBookReviews } from "../controllers/book.controller";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, createBookReview);

router.get("/", protectRoute, getBookReviews);

export default router;