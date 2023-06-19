import { LoginModel } from "../models/auth.model";
import { User } from "../models/user.model";
import axiosClient from "./axiosClient";

const addBearerToken = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const authApi = {
  register(data: LoginModel): Promise<User> {
    const url = "/admin-auth/register";
    return axiosClient.post(url, data);
  },
  login(data: LoginModel): Promise<User> {
    const url = "/admin-auth/login";
    return axiosClient.post(url, data);
  },
  getProfile(token: string): Promise<User> {
    const url = "/user/profile";
    return axiosClient.get(url, addBearerToken(token));
  },
};

export default authApi;
