import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import job from "./lib/cron.js";

config();
const app = express();

const PORT = process.env.PORT || 5000;
job.start(); // CRON JOB
app.use(express.json());
app.use(cors({origin: "*"}));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running @ PORT ${PORT}`);
    connectDB();
});