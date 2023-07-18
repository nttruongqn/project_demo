import { Product } from "./product.model";

export interface TransactionOrder {
    id: string;
    fullName: string;
    address: string;
    phone: string;
    totalAmount: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    orders: Order[];
   
}

interface Order {
    id: string;
    product: Product;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}