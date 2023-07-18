import { Role } from "./role.model";

export interface User {
    id?: string,
    email?: string,
    username: string,
    accessToken: string,
    role?: Role,
    createdAt: string,
    updatedAt: string,
}