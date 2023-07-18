import * as React from 'react';
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInputField } from '../../../../components/FormFields/CustomInputField';
import { PasswordInputField } from '../../../../components/FormFields/PasswordInputField';
import { RegisterModel } from '../../../../models';

export interface IRegisterFormProps {
    initialValues: RegisterModel;
    onRegisterSubmit?: (formValues: RegisterModel) => void;
    isRegisterSuccess: boolean;
    isRegisterFailed: boolean;
    handleShowLogin: () => void;
}

const schema = yup.object({
    email: yup.string().required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩU").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự'),
    repassword: yup.string().required("Vui lòng nhập lại mật khẩU").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự').oneOf([yup.ref("password")], 'Mật khẩu không khớp'),
    username: yup.string().required("Vui lòng nhập tên tài khoản"),
}).required();


export function RegisterForm({ initialValues, onRegisterSubmit, isRegisterSuccess, isRegisterFailed, handleShowLogin }: IRegisterFormProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<RegisterModel>({ defaultValues: initialValues, resolver: yupResolver(schema) });

    const handleRegisterFormSubmit = async (formValues: RegisterModel) => {
        try {
            await onRegisterSubmit?.(formValues)
        } catch (error) {
            console.log("User register failed")
        }
    }


    return (
        <>
            <div className="h2 text-center text-2xl font-bold">Đăng ký</div>
            <p>Vui lòng nhập đầy đủ thông tin đăng ký</p>
            <form onSubmit={handleSubmit(handleRegisterFormSubmit)} className='flex flex-col gap-2'>
                <CustomInputField name="username" control={control} label="email" placeholder='Nhập tên tài khoản' />
                <CustomInputField name="email" control={control} label="email" placeholder='Nhập email' />
                <PasswordInputField name="password" control={control} label="pass" placeholder='Nhập mật khẩu' />
                <PasswordInputField name="repassword" control={control} label="re-pass" placeholder='Nhập lại mật khẩu' />
                {isRegisterSuccess && (<p className='text-green-600'>Đăng ký tài khoản thành công</p>)}
                {isRegisterFailed && (<p className='text-red-600'>Đăng ký tài khoản thất bại</p>)}
                <p className=''>Quay lại đăng nhập ? <span className='text-red-700 cursor-pointer' onClick={handleShowLogin}>Đăng nhập</span></p>
                <Button
                    size='medium'
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    className=' !bg-red-700'
                >
                    {isSubmitting && <CircularProgress size={16} />} &nbsp;Đăng ký
                </Button>
            </form>
        </>
    );
}
