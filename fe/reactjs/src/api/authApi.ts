import { LoginModel, RegisterModel } from "../models/auth.model";
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
    const url = "/admin-auths/register";
    return axiosClient.post(url, data);
  },
  userRegister(data: RegisterModel): Promise<User> {
    const url = "/auths/register";
    return axiosClient.post(url, data);
  },
  login(data: LoginModel): Promise<User> {
    const url = "/admin-auths/login";
    return axiosClient.post(url, data);
  },
  getProfile(token: string): Promise<User> {
    const url = "/users/profile";
    return axiosClient.get(url, addBearerToken(token));
  },
};

export default authApi;
