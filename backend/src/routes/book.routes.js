import express from "express";
import { createBookReview, getBookReviews, deleteBookReview, getUserBookReviews } from "../controllers/book.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createBookReview);

router.get("/", protectRoute, getBookReviews);

router.get("/user", protectRoute, getUserBookReviews);

router.delete("/:id", protectRoute, deleteBookReview)

export default router;