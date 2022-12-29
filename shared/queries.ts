import { AxiosResponse } from "axios";
import axiosInstance from "./axios-settings";
import { GetAccessTokenRequest, ResponseBody, User } from "./types";

export const getUserByEmail = async (email: string) => {
  return axiosInstance.get<ResponseBody<User>>(`users/email/${email}`);
};

export const createUser = async (user: Omit<User, "id">) => {
  console.log("user", user);
  return axiosInstance.post<ResponseBody<User>>(`users`, user);
};

export const getAccessToken = async (request: GetAccessTokenRequest) => {
  return axiosInstance.post<ResponseBody<string>>(`users/auth`, request);
};
