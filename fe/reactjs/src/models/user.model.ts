import { Role } from "./role.model";

export interface User {
    id?: string,
    email?: string,
    accessToken: string,
    role?: Role
}