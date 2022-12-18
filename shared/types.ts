export const NavCategory = {
  TEMPLATE: "Template",
  PROFILE: "Profile",
  EDUCATION: "Education",
  WORK: "Work",
  SKILLS: "Skills",
  AWARDS: "Awards",
  PROJECTS: "Projects",
} as const;

export type NavCategoryType = keyof typeof NavCategory;
export type NavCategoryValueType = typeof NavCategory[keyof typeof NavCategory];
export type SetNavBar = (update: NavCategoryValueType) => void;

// Tab Content Types

export type ProfileInfo = {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  website?: string;
};

export type EducationInfo = {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  major: string;
  GPA: number;
  startDate?: string;
  endDate?: string;
};

export type WorkInfo = {
  companyName: string;
  jobTitle: string;
  location: string;
  startDate?: string;
  endDate?: string;
  responsibilities: string[];
};

export type SkillInfo = {
  name: string;
  details: string[];
};

export type ProjectInfo = {
  name: string;
  description: string;
  link: string;
  toolsUsed: string[];
};

export type AwardInfo = {
  name: string;
  date: string;
  awarder: string;
  summary: string;
};
