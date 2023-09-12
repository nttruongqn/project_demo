export interface ChangePasswordModel {
    email?: string;
    currentPassword: string;
    newPassword: string;
    repassword: string;
}