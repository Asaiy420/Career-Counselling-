export interface Career {
  id: string;
  title: string;
  field: string;
  level: string;
  summary: string;
  skills: string[];
}

export const careers: Career[] = [
  {
    id: "career-1",
    title: "UI/UX Designer",
    field: "Design",
    level: "Entry / Mid",
    summary: "Design intuitive and accessible digital products that connect people to meaningful experiences.",
    skills: ["Figma", "User research", "Interaction design"],
  },
  {
    id: "career-2",
    title: "Data Analyst",
    field: "Analytics",
    level: "Entry / Mid",
    summary: "Turn business questions into actionable insights using data modeling, visualization, and analytics.",
    skills: ["SQL", "Excel", "Data storytelling"],
  },
  {
    id: "career-3",
    title: "Software Developer",
    field: "Engineering",
    level: "Entry / Mid",
    summary: "Build, maintain, and ship web applications and APIs for modern product experiences.",
    skills: ["JavaScript", "React", "APIs"],
  },
  {
    id: "career-4",
    title: "Digital Marketing Specialist",
    field: "Marketing",
    level: "Entry / Mid",
    summary: "Manage campaigns, channels, and growth experiments to raise awareness and drive new users.",
    skills: ["SEO", "Content strategy", "Analytics"],
  },
  {
    id: "career-5",
    title: "Product Manager",
    field: "Product",
    level: "Entry / Mid",
    summary: "Define product strategy, align stakeholders, and deliver features that solve real user problems.",
    skills: ["Roadmapping", "User interviews", "Prioritization"],
  },
];
