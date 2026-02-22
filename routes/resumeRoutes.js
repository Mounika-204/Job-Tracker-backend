import express from "express";
import {
  generateResume,
  optimizeResume,
  saveResume
} from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Generate resume (JSON)
router.post("/generate", protect, generateResume);

// Optimize resume (PDF upload)
router.post(
  "/optimize",
  protect,
  upload.single("resume"),
  optimizeResume
);

// Save resume
router.post("/save", protect, saveResume);

export default router;