import { createContext } from "react";
import { TransactionModel, TransactionRequired } from "../models/transaction.model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, UseFormHandleSubmit, useForm } from "react-hook-form";

export interface IFormPaymentProvider {
    children: React.ReactNode;
}

export interface IFormPaymentContext {
    control:  Control<TransactionRequired, any>
    handleSubmit: UseFormHandleSubmit<TransactionRequired, undefined>
    errors: FieldErrors<TransactionRequired>,
    onFormSubmit: (values: TransactionModel) => void;
}

export const FormPaymentContext = createContext({} as IFormPaymentContext);

const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ tên"),
    phone: yup.string().matches(/^[0-9]+$/, "Số điện thoại phải chứa các chữ số (0-9)").typeError("Vui lòng nhập một số điện thoại hợp lệ").required("Vui lòng nhập số điện thoại").min(10, 'Số điện thoại tối thiểu 10 số').max(11, 'Số điện thoại tối đa 11 số'),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    note: yup.string().required("Vui lòng nhập ghi chú"),
}).required();

const initialValues: TransactionRequired =
    {
        fullName: '',
        address: '',
        phone: '',
        note: ''
    } as TransactionRequired

const FormPaymentProvider = ({ children }: IFormPaymentProvider) => {
    const { control, handleSubmit, formState: { errors } } = useForm<TransactionRequired>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const onFormSubmit = async (data: TransactionModel) => {
        console.log('Form data:', data);
    };

    return (
        <FormPaymentContext.Provider value={{ control, handleSubmit, errors, onFormSubmit }}>
            {children}
        </FormPaymentContext.Provider>
    );
};

export default FormPaymentProvider;

