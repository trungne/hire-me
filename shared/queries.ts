import axiosInstance from "./axios-settings";
import { CVInfo, GetAccessTokenRequest, ResponseBody, User } from "./types";

export const getUserByEmail = async (email: string) => {
  return axiosInstance.get<ResponseBody<User>>(`users/email/${email}`);
};

export const createUser = async (user: Omit<User, "id">) => {
  return axiosInstance.post<ResponseBody<User>>(`users`, user);
};

export const getAccessToken = async (request: GetAccessTokenRequest) => {
  return axiosInstance.post<ResponseBody<string>>(`users/auth`, request);
};

type CreateCVRequest = {
  name: string;
  cvBody: CVInfo;
  email: string;
};

export const createCV = async ({ name, cvBody, email }: CreateCVRequest) => {
  const stringifiedBody = JSON.stringify(cvBody);

  return axiosInstance.post<ResponseBody<CVInfo>>(`cv`, {
    name,
    cvBody: stringifiedBody,
    email,
  });
};
