import { CVInfo } from "./types";

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const hasEmptyStringField = (obj: Record<string, string>) => {
  return Object.values(obj).filter((value) => value.length === 0).length > 0;
};

export const getLocalStorageData = <T = string>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const stringifiedData = localStorage.getItem(key);
  if (stringifiedData === null) {
    return null;
  }
  try {
    return JSON.parse(stringifiedData) as T;
  } catch (e) {
    console.error(`Error parsing data with key ${key}`);
  }

  return null;
};

export const convertArrayToMap = <T = any>(array: T[] | null | undefined) => {
  if (!array) {
    return {};
  }
  const map: Record<number, T> = {};
  array.forEach((item, idx) => {
    map[idx] = item;
  });
  return map;
};

export const isClientSide = () => {
  return typeof window !== "undefined";
};
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
};
const DATE_FOTMATTER = new Intl.DateTimeFormat("en-US", options);

export const formatDate = (date: Date) => {
  return DATE_FOTMATTER.format(date);
};

export const getMinimumArrayLength = (array?: any[] | null) => {
  return array?.length || 1;
};

export const parseCvInfo = (cvBody: string): CVInfo | null => {
  try {
    return JSON.parse(cvBody) as CVInfo;
  } catch (e) {
    return null;
  }
};
