import axios from "axios";
import { LoginModel, RegisterModel } from "../models/auth.model";
import { User } from "../models/user.model";
import axiosClient from "./axiosClient";
import { ResetPasswordModel } from "../models/forgot-password.model";

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
  sendEmailForgotPassword(email: string) {
    const url = `/auths/email/forgot-password/${email}`;
    return axiosClient.get(url);
  },
  resetPassword(data: ResetPasswordModel) {
    const url = "/auths/email/reset-password";
    return axiosClient.post(url, data);
  }
};

export default authApi;
