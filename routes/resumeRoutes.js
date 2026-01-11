import express from "express";
import multer from "multer";
import {
  generateResume,
  optimizeResume,
  saveResume
} from "../controllers/resumeController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/generate", protect, generateResume);

/* 🔥 STEP 4 CONNECT HERE */
router.post(
  "/optimize",
  protect,
  (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  optimizeResume
);
router.post("/save", protect, saveResume);

export default router;
