import { OrderModel, OrderPayloadModel } from "../models/order.model";
import axiosClient from "./axiosClient";

export const orderApi = {
    order(data: OrderPayloadModel): Promise<OrderModel> {
        const url = "/orders";
        return axiosClient.post(url, data);
      },
}