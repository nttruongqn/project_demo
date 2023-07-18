import { Category } from "./category.model";
import { MobileSystem } from "./mobile-system.model";
import { User } from "./user.model";

export interface Product {
    id?: string,
    name: string;
    slug: string;
    categoryId: string;
    brandId: string; 
    price: number;
    authId: string;
    isSale: boolean;
    isActive: boolean;
    isHot: boolean;
    totalView: number;
    description: string;
    image: string;
    imageUrl: string;
    descriptionSeo: string;
    keywordSeo: string;
    contentHTML: string;
    contentMarkdown: string;
    pay: number;
    number: number;
    totalRating: number;
    totalNumber: number;
    file: any;
    category: Category;
    user: User;
    sale: number;
    mobileSystem: MobileSystem;
    createdAt: string;
    updatedAt: string;
}