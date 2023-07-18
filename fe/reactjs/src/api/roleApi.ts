import { Role } from "../models";
import axiosClient from "./axiosClient";

export const roleApi = {
  getAll(): Promise<Role[]> {
    const url = "/roles/all";
    return axiosClient.get(url);
  },
};
