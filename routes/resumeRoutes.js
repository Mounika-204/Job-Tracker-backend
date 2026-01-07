import express from "express";
import { saveResume, generateResume } from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js"; // ✅ IMPORTANT

const router = express.Router();

router.post("/generate", protect, generateResume);
router.post("/save", protect, saveResume);

export default router;
