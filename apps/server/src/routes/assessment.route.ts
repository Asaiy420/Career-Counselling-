import express from "express";
import { submitAssessment } from "../controllers/assessment.controller";

import { authMiddleware } from "../middleware/middleware";

const router = express.Router();

router.post("/submit", authMiddleware, submitAssessment);

export default router;
