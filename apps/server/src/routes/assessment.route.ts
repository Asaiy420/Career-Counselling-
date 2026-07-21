import express from "express";
import {
  submitAssessment,
  getActiveAssessment,
  getLatestRecommendations,
} from "../controllers/assessment.controller";

import { authMiddleware } from "../middleware/middleware";

const router = express.Router();

router.get("/active", authMiddleware, getActiveAssessment);
router.post("/submit", authMiddleware, submitAssessment);
router.get("/recommendations", authMiddleware, getLatestRecommendations);

export default router;