import 'dotenv/config';
import mongoose from 'mongoose';
import Career from './models/career.model';

const careers = [
  {
    title: 'Software Engineer',
    description:
      'Design, develop, and maintain software systems and applications. Work with programming languages, frameworks, and tools to build solutions that solve real-world problems.',
    category: 'Technology',
    requiredSkills: ['Programming', 'Problem Solving', 'Algorithms', 'Data Structures', 'Version Control'],
    educationRequired: "Bachelor's in Computer Science or related field",
    averageSalary: '$95,000 - $150,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'Data Scientist',
    description: 'Analyze large datasets to extract insights and build predictive models. Use statistical methods, machine learning, and data visualization to drive business decisions.',
    category: 'Technology',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    educationRequired: "Master's or PhD in Data Science, Statistics, or related field",
    averageSalary: '$110,000 - $170,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'UX Designer',
    description: 'Design user interfaces and experiences for web and mobile applications. Conduct user research, create wireframes, and prototype designs to improve usability.',
    category: 'Technology',
    requiredSkills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Usability Testing'],
    educationRequired: "Bachelor's in Design, HCI, or related field",
    averageSalary: '$80,000 - $130,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Hybrid',
  },
  {
    title: 'Registered Nurse',
    description: 'Provide patient care, administer medications, and coordinate treatment plans in hospitals, clinics, and other healthcare settings.',
    category: 'Healthcare',
    requiredSkills: ['Patient Care', 'Empathy', 'Medical Knowledge', 'Communication', 'Critical Thinking'],
    educationRequired: 'Bachelor of Science in Nursing (BSN)',
    averageSalary: '$65,000 - $100,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Field',
  },
  {
    title: 'Physician',
    description: 'Diagnose and treat illnesses and injuries. Examine patients, interpret medical tests, and prescribe treatments to improve patient health outcomes.',
    category: 'Healthcare',
    requiredSkills: ['Medical Diagnosis', 'Patient Care', 'Analytical Thinking', 'Communication', 'Attention to Detail'],
    educationRequired: 'Doctor of Medicine (MD) + Residency',
    averageSalary: '$180,000 - $350,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'Medical Lab Technician',
    description: 'Conduct laboratory tests on patient samples to help diagnose diseases and monitor treatment. Operate lab equipment and maintain accurate records.',
    category: 'Healthcare',
    requiredSkills: ['Lab Techniques', 'Attention to Detail', 'Microscopy', 'Record Keeping', 'Safety Protocols'],
    educationRequired: "Associate's or Bachelor's in Medical Technology",
    averageSalary: '$45,000 - $70,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Lab',
  },
  {
    title: 'Civil Engineer',
    description: 'Plan, design, and oversee construction of infrastructure projects like roads, bridges, buildings, and water systems. Ensure projects meet safety and environmental standards.',
    category: 'Engineering',
    requiredSkills: ['Structural Analysis', 'AutoCAD', 'Project Management', 'Surveying', 'Mathematics'],
    educationRequired: "Bachelor's in Civil Engineering",
    averageSalary: '$70,000 - $120,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Field',
  },
  {
    title: 'Mechanical Engineer',
    description: 'Design and manufacture mechanical systems and devices. Work across industries including automotive, aerospace, robotics, and manufacturing.',
    category: 'Engineering',
    requiredSkills: ['CAD', 'Thermodynamics', 'Mechanics', 'Material Science', 'Problem Solving'],
    educationRequired: "Bachelor's in Mechanical Engineering",
    averageSalary: '$75,000 - $125,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
  },
  {
    title: 'Electrical Engineer',
    description: 'Design and develop electrical systems and equipment. Work on power generation, electronics, control systems, and telecommunications.',
    category: 'Engineering',
    requiredSkills: ['Circuit Design', 'Power Systems', 'Electronics', 'MATLAB', 'Troubleshooting'],
    educationRequired: "Bachelor's in Electrical Engineering",
    averageSalary: '$80,000 - $135,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
  },
  {
    title: 'Marketing Manager',
    description: 'Develop and execute marketing strategies to promote products and services. Oversee campaigns, market research, and brand positioning.',
    category: 'Business',
    requiredSkills: ['Marketing Strategy', 'Analytics', 'Communication', 'Campaign Management', 'SEO/SEM'],
    educationRequired: "Bachelor's in Marketing or Business",
    averageSalary: '$85,000 - $140,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'Graphic Designer',
    description: 'Create visual concepts for brands, marketing materials, and digital media. Use typography, color theory, and design software to communicate ideas.',
    category: 'Arts & Design',
    requiredSkills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Creativity'],
    educationRequired: "Bachelor's in Graphic Design or related field",
    averageSalary: '$45,000 - $80,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Hybrid',
  },
  {
    title: 'High School Teacher',
    description: 'Educate students in secondary school settings. Develop lesson plans, assess student progress, and create a positive learning environment.',
    category: 'Education',
    requiredSkills: ['Teaching', 'Classroom Management', 'Communication', 'Patience', 'Curriculum Planning'],
    educationRequired: "Bachelor's in Education + Teaching Certification",
    averageSalary: '$45,000 - $75,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
  },
  {
    title: 'Biologist',
    description: 'Study living organisms and their environments. Conduct research in laboratories and field settings to advance scientific knowledge.',
    category: 'Science',
    requiredSkills: ['Research', 'Data Analysis', 'Microscopy', 'Lab Safety', 'Scientific Writing'],
    educationRequired: "Bachelor's or Master's in Biology or related field",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Lab',
  },
  {
    title: 'Lawyer',
    description: 'Represent clients in legal matters, advise on legal rights, and prepare legal documents. Argue cases in court and negotiate settlements.',
    category: 'Legal',
    requiredSkills: ['Legal Research', 'Argumentation', 'Negotiation', 'Writing', 'Critical Thinking'],
    educationRequired: 'Juris Doctor (JD) + Bar Exam Pass',
    averageSalary: '$90,000 - $200,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
  },
  {
    title: 'Financial Analyst',
    description: 'Analyze financial data, prepare reports, and provide investment recommendations. Evaluate economic trends and company performance.',
    category: 'Finance',
    requiredSkills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Valuation', 'Risk Assessment'],
    educationRequired: "Bachelor's in Finance, Economics, or related field",
    averageSalary: '$65,000 - $110,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'Accountant',
    description: 'Prepare and examine financial records. Ensure accuracy of financial statements, compute taxes, and advise on financial compliance.',
    category: 'Finance',
    requiredSkills: ['Accounting', 'Tax Knowledge', 'Attention to Detail', 'QuickBooks', 'Financial Reporting'],
    educationRequired: "Bachelor's in Accounting (CPA preferred)",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
  },
  {
    title: 'Digital Marketer',
    description: 'Plan and execute online marketing campaigns across social media, email, and search engines. Drive traffic, engagement, and conversions.',
    category: 'Marketing',
    requiredSkills: ['Social Media', 'Content Creation', 'SEO', 'Analytics', 'Email Marketing'],
    educationRequired: "Bachelor's in Marketing or related field",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Remote',
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizational networks and systems from cyber threats. Monitor for breaches, conduct risk assessments, and implement security measures.',
    category: 'Technology',
    requiredSkills: ['Network Security', 'Penetration Testing', 'Risk Analysis', 'Firewalls', 'Incident Response'],
    educationRequired: "Bachelor's in Cybersecurity or related field",
    averageSalary: '$90,000 - $145,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
  },
  {
    title: 'Product Manager',
    description: 'Define product vision and strategy. Collaborate with engineering, design, and business teams to build products that customers love.',
    category: 'Business',
    requiredSkills: ['Product Strategy', 'Roadmapping', 'User Research', 'Cross-functional Leadership', 'Agile'],
    educationRequired: "Bachelor's in Business or related field (MBA preferred)",
    averageSalary: '$100,000 - $160,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Hybrid',
  },
  {
    title: 'Content Writer',
    description: 'Create engaging written content for websites, blogs, social media, and marketing materials. Research topics and adapt tone to target audiences.',
    category: 'Marketing',
    requiredSkills: ['Writing', 'Research', 'SEO', 'Editing', 'Creativity'],
    educationRequired: "Bachelor's in English, Journalism, or related field",
    averageSalary: '$40,000 - $75,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Remote',
  },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Career.deleteMany({});
    console.log('Cleared existing careers');

    const inserted = await Career.insertMany(careers);
    console.log(`Seeded ${inserted.length} careers`);

    await mongoose.disconnect();
    console.log('Done - disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();