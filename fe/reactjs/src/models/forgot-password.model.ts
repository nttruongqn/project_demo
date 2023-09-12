export interface EmailForgotPasswordModel {
    email: string;
}

export interface ResetPasswordModel {
    email?: string;
    passwordToken?: string;
    newPassword: string;
    repassword: string;
}