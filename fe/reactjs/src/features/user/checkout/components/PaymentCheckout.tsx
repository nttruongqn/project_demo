import { TransactionModel } from '../../../../models/transaction.model';
import { InputField } from '../../../../components/FormFields';
import { CustomTextareaField } from '../../../../components/FormFields/CustomTextareaField';
import { User } from '../../../../models';
import { useFormPaymentContext } from '../../../../store/hooks';

export interface IPaymenCheckoutProps {
    onSubmit: (formValues: TransactionModel) => void;
    user: User | null;
}


export function PaymentCheckout({ user }: IPaymenCheckoutProps) {
    const { control } = useFormPaymentContext();

    // const fullName = useWatch({ control, name: 'fullName' });
    // const phone = useWatch({ control, name: 'phone' });
    // const address = useWatch({ control, name: 'address' });
    // const note = useWatch({ control, name: 'note' });
    // console.log('errors', errors);

    // const dataInformationCheckout = {
    //     fullName,
    //     phone,
    //     address,
    //     note
    // }
    // const encryptedData = btoa(JSON.stringify(dataInformationCheckout));
    // localStorage.setItem('checkout-info', encryptedData);

    // const handleFormSubmit = (values: TransactionModel) => {
    //     console.log('forms', values)
    // }

    return (
        <>
            {user !== null && (<>
                <div className="flex flex-col px-4 pt-2 pb-4 my-2 bg-white rounded-xl">
                    <div className="flex items-center gap-2">
                        <span className="text-red-700 text-[24px]"><i className="ri-bank-card-fill"></i></span>
                        <p className="mb-1 font-bold text-[24px]">Hình thức thanh toán</p>
                    </div>

                    <div className="px-2">
                        <div className="flex item-centers my-4 gap-1">
                            <input type="radio" name="giaohangmd" value="" className="text-red-600 " />
                            <label className="mb-0.5 text-md">Giao hàng tiêu chuẩn</label>
                        </div>
                            <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField name="fullName" control={control} label="Họ tên người nhận" />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField name="phone" control={control} label="Số điện thoại người nhận" />
                                    </div>
                                    <div className="col-span-2">
                                        <InputField name="address" control={control} label="Địa chỉ người nhận" />
                                    </div>
                                    <div className="col-span-2">
                                        <CustomTextareaField name='note' control={control} label='Ghi chú' />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </>)}

        </>

    );
}
