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
export type type = typeof NavCategory;
