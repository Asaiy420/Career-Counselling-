import mongoose, { Schema, Document } from "mongoose";

export interface IRecommendationEntry {
  careerId: mongoose.Types.ObjectId;
  matchPercentage: number;
}

export interface IAssessmentSubmission extends Document {
  studentId: mongoose.Types.ObjectId;
  assessmentId: mongoose.Types.ObjectId;

  answers: {
    questionId: string;
    optionId: string;
  }[];

  categoryScores: Record<string, number>;
  skillScores: Record<string, number>;
  recommendations: IRecommendationEntry[];

  submittedAt: Date;
}

const AssessmentSubmissionSchema = new Schema<IAssessmentSubmission>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "CareerAssessment",
      required: true,
    },

    answers: [
      {
        questionId: { type: String, required: true },
        optionId: { type: String, required: true },
      },
    ],

    categoryScores: {
      type: Schema.Types.Mixed,
      default: {},
    },

    skillScores: {
      type: Schema.Types.Mixed,
      default: {},
    },

    recommendations: [
      {
        careerId: { type: Schema.Types.ObjectId, ref: "Career", required: true },
        matchPercentage: { type: Number, required: true },
      },
    ],

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAssessmentSubmission>(
  "AssessmentSubmission",
  AssessmentSubmissionSchema
);