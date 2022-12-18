export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const hasEmptyStringField = (obj: Record<string, string>) => {
  return Object.values(obj).filter((value) => value.length === 0).length > 0;
};
