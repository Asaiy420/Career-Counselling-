import type { Response } from "express";
import CareerAssessment from "../models/CareerAssessment";
import AssessmentSubmission from "../models/AssessmentSubmission";
import Career from "../models/career.model";
import type { AuthenticatedRequest } from "../middleware/middleware";

const TOP_N = 6;

export const getActiveAssessment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const assessment = await CareerAssessment.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!assessment) {
      return res
        .status(404)
        .json({ message: "No assessment is available right now" });
    }

    return res.status(200).json({ assessment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const submitAssessment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { assessmentId, answers } = req.body || {};

    if (
      !assessmentId ||
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return res.status(400).json({ message: "Please complete the assessment" });
    }

    const assessment = await CareerAssessment.findById(assessmentId).lean();
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // 1. Tally category weights and skill tags from the selected options
    const categoryScores: Record<string, number> = {};
    const skillScores: Record<string, number> = {};

    for (const submitted of answers) {
      const question = (assessment.questions as any[]).find(
        (q) => q.questionId === submitted.questionId
      );
      if (!question) continue;

      const option = question.options.find(
        (o: any) => o.optionId === submitted.optionId
      );
      if (!option) continue;

      for (const [category, weight] of Object.entries(
        option.categoryWeights || {}
      )) {
        categoryScores[category] =
          (categoryScores[category] || 0) + Number(weight);
      }

      for (const skill of option.skillTags || []) {
        skillScores[skill] = (skillScores[skill] || 0) + 1;
      }
    }

    // 2. Score every active career against those totals
    const careers = await Career.find({ isActive: true }).lean();
    const maxCategoryScore = Math.max(1, ...Object.values(categoryScores));

    const scored = careers.map((career) => {
      const categoryComponent =
        (categoryScores[career.category] || 0) / maxCategoryScore;

      const requiredSkills: string[] = career.requiredSkills || [];
      const matchedSkills = requiredSkills.filter(
        (skill) => skillScores[skill]
      ).length;
      const skillComponent =
        requiredSkills.length > 0 ? matchedSkills / requiredSkills.length : 0;

      const matchPercentage = Math.round(
        (categoryComponent * 0.7 + skillComponent * 0.3) * 100
      );

      return { career, matchPercentage };
    });

    scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

    const recommendations = scored
      .filter((r) => r.matchPercentage > 0)
      .slice(0, TOP_N);

    // 3. Persist the submission so "latest recommendations" can be re-fetched later
    const submission = await AssessmentSubmission.create({
      studentId: req.user!.userId,
      assessmentId,
      answers,
      categoryScores,
      skillScores,
      recommendations: recommendations.map((r) => ({
        careerId: r.career._id,
        matchPercentage: r.matchPercentage,
      })),
    });

    return res.status(201).json({
      message: "Assessment submitted successfully",
      submittedAt: submission.submittedAt,
      recommendations,
      categoryScores,
      skillScores,
      submissionId: submission._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLatestRecommendations = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const submission = await AssessmentSubmission.findOne({
      studentId: req.user!.userId,
    })
      .sort({ submittedAt: -1 })
      .lean();

    if (!submission) {
      return res.status(200).json({
        submittedAt: null,
        recommendations: [],
        categoryScores: {},
        skillScores: {},
      });
    }

    const careerIds = submission.recommendations.map((r: any) => r.careerId);
    const careers = await Career.find({ _id: { $in: careerIds } }).lean();
    const careerMap = new Map(careers.map((c) => [String(c._id), c]));

    const recommendations = submission.recommendations
      .map((r: any) => ({
        career: careerMap.get(String(r.careerId)),
        matchPercentage: r.matchPercentage,
      }))
      .filter((r: any) => Boolean(r.career))
      .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);

    return res.status(200).json({
      submittedAt: submission.submittedAt,
      recommendations,
      categoryScores: submission.categoryScores || {},
      skillScores: submission.skillScores || {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};