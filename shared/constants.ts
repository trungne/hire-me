import { QueryClient } from "react-query";

export const RESUME_INFO_CATEGORIES = {
  TEMPLATE: "Template",
  PROFILE: "Profile",
  EDUCATION: "Education",
  WORK: "Work",
  SKILLS: "Skills",
  AWARDS: "Awards",
  PROJECTS: "Projects",
} as const;

export const QUERY_CLIENT = new QueryClient();

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
