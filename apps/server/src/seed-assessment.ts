import 'dotenv/config';
import mongoose from 'mongoose';
import CareerAssessment from './models/CareerAssessment';

const assessment = {
  title: 'Career Interest Assessment',
  questions: [
    {
      questionId: 'q1',
      text: 'Which activity sounds most enjoyable to you?',
      options: [
        { optionId: 'q1-a', text: 'Writing code to build an app', categoryWeights: { Technology: 2 }, skillTags: ['Programming', 'Problem Solving'] },
        { optionId: 'q1-b', text: 'Caring for someone who is sick', categoryWeights: { Healthcare: 2 }, skillTags: ['Patient Care', 'Empathy'] },
        { optionId: 'q1-c', text: 'Designing a building or bridge', categoryWeights: { Engineering: 2 }, skillTags: ['Structural Analysis', 'Mathematics'] },
        { optionId: 'q1-d', text: 'Creating a piece of art or design', categoryWeights: { 'Arts & Design': 2 }, skillTags: ['Creativity', 'Typography'] },
      ],
    },
    {
      questionId: 'q2',
      text: 'In a group project, you naturally take on the role of...',
      options: [
        { optionId: 'q2-a', text: 'The organizer who manages the plan and budget', categoryWeights: { Business: 2 }, skillTags: ['Project Management', 'Communication'] },
        { optionId: 'q2-b', text: 'The researcher who investigates the topic', categoryWeights: { Science: 2 }, skillTags: ['Research', 'Data Analysis'] },
        { optionId: 'q2-c', text: 'The presenter who explains ideas to others', categoryWeights: { Marketing: 2, Education: 1 }, skillTags: ['Communication', 'Content Creation'] },
        { optionId: 'q2-d', text: 'The mediator who resolves disagreements fairly', categoryWeights: { Legal: 2 }, skillTags: ['Negotiation', 'Critical Thinking'] },
      ],
    },
    {
      questionId: 'q3',
      text: 'Which school subject do you enjoy most?',
      options: [
        { optionId: 'q3-a', text: 'Math and Physics', categoryWeights: { Engineering: 2, Finance: 1 }, skillTags: ['Mathematics', 'Problem Solving'] },
        { optionId: 'q3-b', text: 'Biology and Chemistry', categoryWeights: { Healthcare: 2, Science: 1 }, skillTags: ['Medical Knowledge', 'Research'] },
        { optionId: 'q3-c', text: 'Computer Science', categoryWeights: { Technology: 2 }, skillTags: ['Programming', 'Algorithms'] },
        { optionId: 'q3-d', text: 'Art and Literature', categoryWeights: { 'Arts & Design': 2 }, skillTags: ['Creativity', 'Writing'] },
      ],
    },
    {
      questionId: 'q4',
      text: 'What kind of impact do you want your work to have?',
      options: [
        { optionId: 'q4-a', text: "Directly improving people's health", categoryWeights: { Healthcare: 2 }, skillTags: ['Patient Care', 'Critical Thinking'] },
        { optionId: 'q4-b', text: 'Building products people use every day', categoryWeights: { Technology: 2, Business: 1 }, skillTags: ['Problem Solving', 'Product Strategy'] },
        { optionId: 'q4-c', text: 'Helping students learn and grow', categoryWeights: { Education: 2 }, skillTags: ['Teaching', 'Patience'] },
        { optionId: 'q4-d', text: "Protecting people's rights", categoryWeights: { Legal: 2 }, skillTags: ['Legal Research', 'Argumentation'] },
      ],
    },
    {
      questionId: 'q5',
      text: 'Which environment do you prefer working in?',
      options: [
        { optionId: 'q5-a', text: 'A lab running experiments', categoryWeights: { Science: 2, Healthcare: 1 }, skillTags: ['Lab Safety', 'Attention to Detail'] },
        { optionId: 'q5-b', text: 'An office analyzing numbers and reports', categoryWeights: { Finance: 2 }, skillTags: ['Excel', 'Data Analysis'] },
        { optionId: 'q5-c', text: 'A studio creating visuals', categoryWeights: { 'Arts & Design': 2 }, skillTags: ['Adobe Creative Suite', 'Color Theory'] },
        { optionId: 'q5-d', text: 'A construction site or job site', categoryWeights: { Engineering: 2 }, skillTags: ['AutoCAD', 'Surveying'] },
      ],
    },
    {
      questionId: 'q6',
      text: "What's your strongest skill?",
      options: [
        { optionId: 'q6-a', text: 'Persuading and negotiating', categoryWeights: { Legal: 2, Business: 1 }, skillTags: ['Negotiation', 'Communication'] },
        { optionId: 'q6-b', text: 'Analyzing data and numbers', categoryWeights: { Finance: 2, Technology: 1 }, skillTags: ['Data Analysis', 'Excel'] },
        { optionId: 'q6-c', text: 'Explaining complex ideas simply', categoryWeights: { Education: 2, Marketing: 1 }, skillTags: ['Teaching', 'Communication'] },
        { optionId: 'q6-d', text: 'Fixing and building things', categoryWeights: { Engineering: 2 }, skillTags: ['Problem Solving', 'CAD'] },
      ],
    },
    {
      questionId: 'q7',
      text: 'Pick a weekend activity:',
      options: [
        { optionId: 'q7-a', text: 'Building a personal coding project', categoryWeights: { Technology: 2 }, skillTags: ['Programming', 'Version Control'] },
        { optionId: 'q7-b', text: 'Volunteering at a hospital or clinic', categoryWeights: { Healthcare: 2 }, skillTags: ['Patient Care', 'Empathy'] },
        { optionId: 'q7-c', text: 'Managing a small budget or side business', categoryWeights: { Finance: 2, Business: 1 }, skillTags: ['Financial Modeling', 'Analytics'] },
        { optionId: 'q7-d', text: 'Posting content on social media', categoryWeights: { Marketing: 2 }, skillTags: ['Social Media', 'Content Creation'] },
      ],
    },
    {
      questionId: 'q8',
      text: 'Which career value matters most to you?',
      options: [
        { optionId: 'q8-a', text: 'Financial stability and growth', categoryWeights: { Finance: 2, Business: 1 }, skillTags: ['Financial Modeling', 'Risk Assessment'] },
        { optionId: 'q8-b', text: 'Creative freedom and self-expression', categoryWeights: { 'Arts & Design': 2, Marketing: 1 }, skillTags: ['Creativity', 'Content Creation'] },
        { optionId: 'q8-c', text: 'Solving technical problems', categoryWeights: { Technology: 2, Engineering: 1 }, skillTags: ['Problem Solving', 'Algorithms'] },
        { optionId: 'q8-d', text: "Making a difference in people's lives", categoryWeights: { Healthcare: 2, Education: 1 }, skillTags: ['Patient Care', 'Teaching'] },
      ],
    },
  ],
};

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await CareerAssessment.deleteMany({});
    console.log('Cleared existing assessments');

    const inserted = await CareerAssessment.create(assessment);
    console.log(`Seeded assessment: ${inserted._id}`);

    await mongoose.disconnect();
    console.log('Done - disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();