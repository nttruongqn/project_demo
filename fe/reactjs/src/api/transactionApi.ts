import { ListParams, ListResponse } from "../models/common";
import { TransactionOrder } from "../models/transaction-order.model";
import axiosClient from "./axiosClient";

export const transactionApi = {
  getAllPaginate(params: ListParams): Promise<ListResponse<TransactionOrder>> {
    const url = "/transactions";
    return axiosClient.get(url, { params });
  },
  revokeTransaction(id: string): Promise<void> {
    const url = `/transactions/${id}`;
    return axiosClient.delete(url);
  },
  changeStatusTransaction(id: string): Promise<void> {
    const url = `/transactions/${id}/status`;
    return axiosClient.put(url);
  },
};
