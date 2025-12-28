// routes/jobRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createJob, getJobs, updateJob, updateJobStatus, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.put("/:id", protect, updateJob);
router.put("/:id/status", protect, updateJobStatus);
router.delete("/:id", protect, deleteJob);

// ✅ THIS IS CRUCIAL
export default router;
