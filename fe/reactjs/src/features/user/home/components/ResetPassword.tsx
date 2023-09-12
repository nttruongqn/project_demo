import * as React from 'react';
import { ResetPasswordModel } from '../../../../models/forgot-password.model';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { PasswordInputField } from '../../../../components/FormFields/PasswordInputField';
import { Button, CircularProgress } from '@mui/material';

export interface IResetPasswordProps {
    initialValues: ResetPasswordModel;
    onSubmit: (formValues: ResetPasswordModel) => void;
}

const schema = yup.object({
    newPassword: yup.string().required("Vui lòng nhập mật khẩu").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự'),
    repassword: yup.string().required("Vui lòng nhập lại mật khẩu").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự').oneOf([yup.ref("newPassword")], 'Mật khẩu không khớp'),
}).required();


export function ResetPassword({ initialValues, onSubmit }: IResetPasswordProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<ResetPasswordModel>({ defaultValues: initialValues, resolver: yupResolver(schema) });

    const handleForgotPassword = async (formValues: ResetPasswordModel) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log("Reset password failed")

        }
    }

    return (
        <> <div className="h2 text-center text-2xl font-bold">Vui lòng lại mật khẩu mới</div>
            {/* <p>Vui lòng đăng nhập để sử dụng dịch vụ</p> */}
            <form onSubmit={handleSubmit(handleForgotPassword)} className='flex flex-col gap-2'>
                <PasswordInputField name="newPassword" control={control} label="pass" placeholder='Nhập mật khẩu' />
                <PasswordInputField name="repassword" control={control} label="re-pass" placeholder='Nhập lại mật khẩu' />
                <Button
                    size='medium'
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    className=' !bg-red-700'
                >
                    {isSubmitting && <CircularProgress size={16} />} &nbsp;Thay đổi password
                </Button>
            </form>
        </>
    );
}
