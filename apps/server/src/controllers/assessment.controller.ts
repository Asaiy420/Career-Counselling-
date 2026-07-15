import type { Response } from "express";
import AssessmentSubmission from "../models/AssessmentSubmission";
import type { AuthenticatedRequest } from "../middleware/middleware";

export const submitAssessment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { answers } = req.body || {};

    // Validate responses
    if (!answers || answers.length === 0) {
      return res.status(400).json({
        message: "Please complete the assessment",
      });
    }

    // Simple recommendation algorithm
    let recommendations: string[] = [];

    answers.forEach((item: any) => {
      if (item.answer === "Programming") {
        recommendations.push("Software Engineer");
      }

      if (item.answer === "Design") {
        recommendations.push("UI/UX Designer");
      }

      if (item.answer === "Mathematics") {
        recommendations.push("Data Analyst");
      }
    });

    // Remove duplicates
    recommendations = [...new Set(recommendations)];

    if (recommendations.length === 0) {
      recommendations.push("Explore different career fields");
    }

    const submission = await AssessmentSubmission.create({
      studentId: req.user!.userId,

      answers,

      recommendations,
    });

    return res.status(201).json({
      message: "Assessment submitted successfully",

      result: {
        recommendations,
        submissionId: submission._id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
