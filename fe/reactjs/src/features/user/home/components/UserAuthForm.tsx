import * as React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { CustomInputField } from '../../../../components/FormFields/CustomInputField';
import { PasswordInputField } from '../../../../components/FormFields/PasswordInputField';
import { LoginModel, RegisterModel } from '../../../../models';

export interface IUserAuthFormProps {
    initialValues: LoginModel | RegisterModel;
    onLoginSubmit?: (formValues: LoginModel) => void;
    handleShowRegister: () => void;
    handleShowForgotPassword: () => void;
}

const schema = yup.object({
    email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự'),
    // repassword: yup.string().required("Vui lòng nhập lại mật khẩu").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự').oneOf([yup.ref("password")], 'Mật khẩu không khớp'),
    // username: yup.string().required("Vui lòng nhập tên tài khoản"),
}).required();

export function UserAuthForm({ initialValues, onLoginSubmit, handleShowRegister, handleShowForgotPassword }: IUserAuthFormProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginModel>({ defaultValues: initialValues, resolver: yupResolver(schema) });

    const handleLoginFormSubmit = async (formValues: LoginModel) => {
        try {
            await onLoginSubmit?.(formValues)
        } catch (error) {
            console.log("User login failed")
        }
    }

    return (
        <>
            <div className="h2 text-center text-2xl font-bold">Đăng nhập</div>
            <p>Vui lòng đăng nhập để sử dụng dịch vụ</p>
            <form onSubmit={handleSubmit(handleLoginFormSubmit)} className='flex flex-col gap-2'>
                <CustomInputField name="email" control={control} label="email" placeholder='Nhập email' />
                <PasswordInputField name="password" control={control} label="pass" placeholder='Nhập mật khẩu' />
                <p className='mt-1'>Chưa có tài khoản? <span className='text-red-700 cursor-pointer' onClick={handleShowRegister}>Đăng ký</span></p>
                <p className='mb-1'><span className='text-red-700 cursor-pointer' onClick={handleShowForgotPassword}>Quên mật khẩu</span></p>
                <Button
                    size='medium'
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    className=' !bg-red-700'
                >
                    {isSubmitting && <CircularProgress size={16} />} &nbsp;Đăng nhập
                </Button>
            </form>
        </>
    );
}
