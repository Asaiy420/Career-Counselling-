import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Healthcare',
        'Engineering',
        'Business',
        'Arts & Design',
        'Education',
        'Science',
        'Legal',
        'Finance',
        'Marketing',
      ],
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    educationRequired: {
      type: String,
      required: true,
    },
    averageSalary: {
      type: String,
      required: true,
    },
    growthOutlook: {
      type: String,
      enum: ['Declining', 'Stable', 'Growing', 'Fast Growing'],
      default: 'Stable',
    },
    workEnvironment: {
      type: String,
      enum: ['Remote', 'Office', 'Hybrid', 'Field', 'Lab', 'Variable'],
      default: 'Office',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

careerSchema.index({ title: 'text', description: 'text' });
careerSchema.index({ category: 1 });

const Career = mongoose.model('Career', careerSchema);
export default Career;