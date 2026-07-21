import express from "express";
import {
  submitAssessment,
  getActiveAssessment,
  getLatestRecommendations,
  getAssessmentStatus,
} from "../controllers/assessment.controller";

import { authMiddleware } from "../middleware/middleware";

const router = express.Router();

router.get("/active", authMiddleware, getActiveAssessment);
router.get("/status", authMiddleware, getAssessmentStatus);
router.post("/submit", authMiddleware, submitAssessment);
router.get("/recommendations", authMiddleware, getLatestRecommendations);

export default router;