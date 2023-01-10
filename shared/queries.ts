import axiosInstance from "./axios-settings";
import { CV, CVInfo, GetAccessTokenRequest, ResponseBody, User } from "./types";

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

  return axiosInstance.post<ResponseBody<CV>>(`cv`, {
    name,
    cvBody: stringifiedBody,
    email,
  });
};

export const getCV = async (id: string) => {
  return axiosInstance.get<ResponseBody<CV>>(`cv/${id}`);
};

export const getAllCVsByEmail = async (email: string) => {
  return axiosInstance.get<ResponseBody<CV[]>>(`cv`, {
    params: { email },
  });
};

type UpdateCvRequest = {
  id: string;
  cvBody?: CVInfo;
  name?: string;
};

export const updateCvById = async ({ id, cvBody, name }: UpdateCvRequest) => {
  const stringifiedBody = JSON.stringify(cvBody);

  return axiosInstance.patch<void>(`cv/${id}`, {
    cvBody: stringifiedBody,
    name,
  });
};

export const deleteCvById = async (id: string) => {
  return axiosInstance.delete<void>(`cv/${id}`);
};
