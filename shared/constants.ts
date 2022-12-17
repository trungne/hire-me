import { QueryClient } from "react-query";
import { NavCategoryType } from "./types";

export const NAV_BAR: NavCategoryType[] = [
  "TEMPLATE",
  "PROFILE",
  "EDUCATION",
  "WORK",
  "SKILLS",
  "PROJECTS",
  "AWARDS",
];

export const QUERY_CLIENT = new QueryClient();

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const APP_LOCAL_STORAGE_PREFIX = "HIRE_ME_";
export const CURRENT_NAV_BAR_LOCAL_STORAGE =
  APP_LOCAL_STORAGE_PREFIX + "NAV_BAR";
