import { Product } from "../models";
import { CheckboxElements } from "../models/checkbox-elements.model";
import { ListParams, ListResponse } from "../models/common";
import { ProductPayload } from "../models/product-payload.model";
import axiosClient from "./axiosClient";

export const productApi = {
  getAllPaginate(params: ListParams): Promise<ListResponse<Product>> {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getElementsCheckBoxProduct(): Promise<CheckboxElements>{
    const url = "/products/elements";
    return axiosClient.get(url);

  },
  findById(id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  findBySlug(slugName: string): Promise<Product> {
    const url = `/products/slug/${slugName}`;
    return axiosClient.get(url);
  },
  findByIdAndSlug(id: string, slugName: string): Promise<Product> {
    const url = `/products/${id}/slug/${slugName}`;
    return axiosClient.get(url);
  },
  findRelatedProducts(id: string, categoryId: string): Promise<Product[]> {
    const url = `/products/${id}/category/${categoryId}`
    return axiosClient.get(url)
  },
  add(data: any): Promise<Product> {
    const url = "/products";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addWithEmptyImage(data: ProductPayload): Promise<Product> {
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
  updateWithEmptyImage(data: ProductPayload): Promise<Product> {
    const url = `/products/${data.id}/empty-image`;
    return axiosClient.put(url, data);
  },
  delete(id: string): Promise<void> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
