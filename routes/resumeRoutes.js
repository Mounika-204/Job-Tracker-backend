import express from "express";
import {
  generateResume,
  optimizeResume,
  matchResume,   // ✅ ADD THIS
  saveResume
} from "../controllers/resumeController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ Generate resume (JSON)
router.post("/generate", protect, generateResume);

// ✅ Optimize resume (PDF upload)
router.post(
  "/optimize",
  protect,
  upload.single("resume"),
  optimizeResume
);

// 🔥 NEW ROUTE (VERY IMPORTANT)
router.post(
  "/match",
  protect,
  upload.single("resume"),
  matchResume
);

// ✅ Save resume
router.post("/save", protect, saveResume);

export default router;