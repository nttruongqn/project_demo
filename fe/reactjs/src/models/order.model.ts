import { CartItemModel } from "./cartItem.model";
import { TransactionModel } from "./transaction.model";

export interface OrderPayloadModel {
    cartItems: CartItemModel[];
    transaction: TransactionModel;
}

export interface OrderModel {
    transactionId: string;
    productId: string;
    quantity: number;
    price: number,
    isSale: boolean,
    sale: number,
    id: string;
    createdAt: string;
    updatedAt: string;
}