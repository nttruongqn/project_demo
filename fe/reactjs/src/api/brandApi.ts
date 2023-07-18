import { Brand } from "../models/brand.model";
import axiosClient from "./axiosClient";

export const brandApi = {
    getAll(): Promise<Brand[]> {
        const url = "/brands/all";
        return axiosClient.get(url);
      },
}