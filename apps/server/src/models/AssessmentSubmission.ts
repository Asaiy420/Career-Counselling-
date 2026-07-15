import mongoose, { Schema, Document } from "mongoose";

export interface IAssessmentSubmission extends Document {
  studentId: mongoose.Types.ObjectId;

  answers: {
    questionId: string;
    answer: string;
  }[];

  recommendations: string[];

  submittedAt: Date;
}

const AssessmentSubmissionSchema = new Schema<IAssessmentSubmission>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          required: true,
        },
      },
    ],

    recommendations: {
      type: [String],
      required: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAssessmentSubmission>(
  "AssessmentSubmission",
  AssessmentSubmissionSchema
);
