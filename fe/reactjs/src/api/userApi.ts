import { User } from "../models";
import { ListParams, ListResponse } from "../models/common";
import axiosClient from "./axiosClient";

export const userApi = {
  getAllPaginate(params: ListParams): Promise<ListResponse<User>> {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
};
