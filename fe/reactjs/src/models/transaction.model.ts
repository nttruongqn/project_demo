export interface TransactionModel {
    userId?: string;
    fullName: string;
    address: string;
    phone: string;
    note?: string;
    status: string;
}

export interface TransactionRequired {
    fullName: string;
    phone: string;
    address: string;
    note: string;
}