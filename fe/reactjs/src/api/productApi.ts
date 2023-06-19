import { Product } from "../models";
import { ListParams, ListResponse } from "../models/common";
import axiosClient from "./axiosClient";

export const productApi = {
  getAll(params: ListParams): Promise<ListResponse<Product>> {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  findById(id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data: any): Promise<Product> {
    const url = "/products";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
  },
  addWithEmptyImage(data: Product): Promise<Product> {
    const url = "/products/empty-image";
    return axiosClient.post(url, data);
  },
  update(data: any, id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
  },
  updateWithEmptyImage(data: Product): Promise<Product> {
    const url = `/products/${data.id}/empty-image`;
    return axiosClient.put(url, data);
  },
  delete(id: string): Promise<void> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
