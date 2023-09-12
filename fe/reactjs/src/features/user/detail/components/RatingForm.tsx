import * as React from 'react';
import { Rating } from '../../../../models/rating.model';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { InputField } from '../../../../components/FormFields';
import { CustomTextareaField } from '../../../../components/FormFields/CustomTextareaField';
import { useAuth } from '../../../../store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';

export interface IRatingFormProps {
    initialValues?: Rating;
    onSubmit?: (formValues: Rating) => void;
}

const schema = yup.object({
    fullName: yup.string().required("Vui lòng nhập họ tên"),
    phoneNumber: yup.string().matches(/^[0-9]+$/, "Số điện thoại phải chứa các chữ số (0-9)").typeError("Vui lòng nhập một số điện thoại hợp lệ").required("Vui lòng nhập số điện thoại").min(10, 'Số điện thoại tối thiểu 10 số').max(11, 'Số điện thoại tối đa 11 số'),
    ratingContent: yup.string().required("Vui lòng nhập nội dung đánh giá"),
    ratingNumber: yup.number().required("Vui lòng đánh giá sao"),
}).required();


export function RatingForm({ initialValues, onSubmit }: IRatingFormProps) {
    const { user } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Rating>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: Rating) => {
        try {
            if (user) {
                formValues.userId = user.id as string;
                await onSubmit?.(formValues)
            } else {
                toast.error('Vui lòng đăng nhập để gửi bình luận', {
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error('Failed', {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <div className="w-full max-md:my-4">
                <h1 className="text-xl text-red-700 font-bold md:text-2xl md:my-2">Bình luận</h1>
                <Box>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <CustomTextareaField name="ratingContent" control={control} label="Nhận xét sản phẩm" />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField name="fullName" control={control} label="Họ tên" />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField name="phoneNumber" control={control} label="Số điện thoại" />
                            </Grid>
                        </Grid>
                        <Box mt="20px" >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className='!bg-red-800'
                            >
                                {isSubmitting && <CircularProgress size={16} />} &nbsp;Gửi bình luận
                            </Button>
                        </Box>
                    </form>
                </Box>
            </div>

        </>

    );
}
