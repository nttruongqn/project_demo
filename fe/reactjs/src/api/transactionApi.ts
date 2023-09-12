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
  changeStatusTransactionSuccess(id: string): Promise<void> {
    const url = `/transactions/${id}/status/success`;
    return axiosClient.put(url);
  },
  changeStatusTransactionCancellation(id: string): Promise<void> {
    const url = `/transactions/${id}/status/cancellation`;
    return axiosClient.put(url);
  },
};
