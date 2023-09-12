import { ListParams } from "../models/common";
import { CountTransactionMonth } from "../models/count-transaction-month.model";
import { TotalNumberSectionsModel } from "../models/total-sections.model";
import axiosClient from "./axiosClient";

export const dashboardApi = {
  getTotalNumberSections(): Promise<TotalNumberSectionsModel> {
    const url = "/dashboards/total-sections";
    return axiosClient.get(url);
  },

  getTransactionListSuccess(params: CountTransactionMonth): Promise<number[]> {
    const url = "/dashboards/transactions/success/month/count";
    return axiosClient.get(url, { params });
  },

  getTransactionListCancellation(params: CountTransactionMonth): Promise<number[]> {
    const url = "/dashboards/transactions/cancellation/month/count";
    return axiosClient.get(url, { params });
  },
};
