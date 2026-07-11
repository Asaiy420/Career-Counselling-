import { Schema, model, Document, Types } from 'mongoose';

export interface ICareerAssessment extends Document {
  title: string;
  questions: any[];
  createdAt: Date;
}

const CareerAssessmentSchema = new Schema<ICareerAssessment>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: {
    type: [Schema.Types.Mixed] as any,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICareerAssessment>(
  'CareerAssessment',
  CareerAssessmentSchema
);
