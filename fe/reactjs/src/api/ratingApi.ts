import { Rating } from "../models/rating.model";
import axiosClient from "./axiosClient";

export const ratingApi = {
  getAll(): Promise<Rating[]> {
    const url = "/ratings/all";
    return axiosClient.get(url);
  },

  getById(id: string): Promise<Rating[]> {
    const url = `/ratings/product/${id}`;
    return axiosClient.get(url);
  },

  getPercentRating(id: string, ratingNumber: number): Promise<number> {
    const url = `/ratings/product/${id}/percent/${ratingNumber}`;
    return axiosClient.get(url);
  },

  create(data: Rating): Promise<Rating> {
    const url = "/ratings";
    return axiosClient.post(url, data);
  },
};
