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
