import axiosInstance from "./axios-settings";

export const getCVs = () => {
  return axiosInstance.get<String, String>("/");
};
