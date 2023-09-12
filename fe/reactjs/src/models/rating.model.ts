export interface Rating {
    productId?:string,
    userId?: string,
    ratingContent: string,
    ratingNumber: number,
    fullName: string,
    phoneNumber: string
    createdAt?: string
}