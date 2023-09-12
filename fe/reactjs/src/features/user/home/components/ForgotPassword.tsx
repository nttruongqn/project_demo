import * as React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import { CustomInputField } from '../../../../components/FormFields/CustomInputField';
import { EmailForgotPasswordModel } from '../../../../models/forgot-password.model';

export interface IForgotPasswordProps {
    initialValues: EmailForgotPasswordModel;
    onSubmit: (formValues: EmailForgotPasswordModel) => void;
    messageSuccess?: string;
}

const schema = yup.object({
    email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
})

export function ForgotPassword({ initialValues, onSubmit, messageSuccess }: IForgotPasswordProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<EmailForgotPasswordModel>({ defaultValues: initialValues, resolver: yupResolver(schema) });

    const handleForgotSubmit = async (formValues: EmailForgotPasswordModel) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log("Request forgot password failed")
        }
    }

    return (
        <div>
            <>
                <div className="h2 text-center text-2xl font-bold mb-2">Lấy lại mật khẩu</div>
                <form onSubmit={handleSubmit(handleForgotSubmit)} className='flex flex-col gap-3'>
                    <CustomInputField name="email" control={control} label="email" placeholder='Nhập email' />
                    {messageSuccess && (<p className='text-green-600 text-sm'> {messageSuccess}</p>)}
                    <Button
                        size='medium'
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        className=' !bg-red-700'
                    >
                        {isSubmitting && <CircularProgress size={16} />} &nbsp;Gửi
                    </Button>
                </form>
            </>
        </div>
    );
}
