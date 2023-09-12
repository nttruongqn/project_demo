import * as React from 'react';
import * as yup from "yup";
import { ChangePasswordModel } from '../../../../models/change-password.model';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { PasswordInputField } from '../../../../components/FormFields/PasswordInputField';

export interface IChangePasswordProps {
    initialValues: ChangePasswordModel;
    onSubmit: (formValues: ChangePasswordModel) => void;
}

const schema = yup.object({
    currentPassword: yup.string().required("Vui lòng nhập mật khẩu cũ").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự'),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự'),
    repassword: yup.string().required("Vui lòng nhập lại mật khẩu").min(4, 'Mật khẩu tối thiểu 4 kí tự').max(12, 'Mật khẩu tối đa 12 kí tự').oneOf([yup.ref("newPassword")], 'Mật khẩu không khớp'),
})

export function ChangePassword({ initialValues, onSubmit }: IChangePasswordProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<ChangePasswordModel>({ defaultValues: initialValues, resolver: yupResolver(schema) });

    const handleChangePassword = async (formValues: ChangePasswordModel) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log("Request change password failed")
        }
    }

    return (
        <>
            <div className="h2 text-center text-2xl font-bold">Thay đổi mật khẩu</div>
            <p>Vui lòng nhập đầy đủ thông tin để thay đổi mật khẩu</p>
            <form onSubmit={handleSubmit(handleChangePassword)} className='flex flex-col gap-2'>
                <PasswordInputField name="currentPassword" control={control} label="Mật khẩu cũ" placeholder='Nhập mật khẩu hiện tại' />
                <PasswordInputField name="newPassword" control={control} label="Mật khẩu mới" placeholder='Nhập mật khẩu mới' />
                <PasswordInputField name="repassword" control={control} label="Nhập lại mật khẩu mới" placeholder='Nhập lại mật khẩu' />
                <Button
                    size='medium'
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    className='!bg-red-700'
                >
                    {isSubmitting && <CircularProgress size={16} />} &nbsp;Thay đổi mật khẩu
                </Button>
            </form>
        </>
    );
}
