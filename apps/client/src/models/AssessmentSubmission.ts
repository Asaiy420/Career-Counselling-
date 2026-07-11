import { Schema, model, Document, Types } from "mongoose";

export interface IAssessmentSubmission extends Document {
  studentId: Types.ObjectId;
  assessmentId: Types.ObjectId;
  answers: any[];
  score: number;
  recommendationIds: Types.ObjectId[];
  submittedAt: Date;
}

const AssessmentSubmissionSchema = new Schema<IAssessmentSubmission>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  assessmentId: {
    type: Schema.Types.ObjectId,
    ref: "CareerAssessment",
    required: true,
  },
  answers: {
    type: [Schema.Types.Mixed],
    required: true,
    default: [],
  },
  score: {
    type: Number,
    required: true,
  },
  recommendationIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Career",
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IAssessmentSubmission>(
  "AssessmentSubmission",
  AssessmentSubmissionSchema
);