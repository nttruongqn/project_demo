import { Category } from "../models";
import { ListParams, ListResponse } from "../models/common";
import axiosClient from "./axiosClient";

export const categoryApi = {
  getList(params: ListParams): Promise<ListResponse<Category>> {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
  getAll(): Promise<ListResponse<Category>> {
    const url = "/categories";
    return axiosClient.get(url);
  },
  findById(id: string): Promise<Category> {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data: Category): Promise<Category> {
    const url = "/categories";
    return axiosClient.post(url, data);
  },
  update(data: Partial<Category>): Promise<Category> {
    const url = `/categories/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(id: string): Promise<void> {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};
