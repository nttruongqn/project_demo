import { InputField } from '../../../../components/FormFields';
import { CustomTextareaField } from '../../../../components/FormFields/CustomTextareaField';
import { useFormPaymentContext } from '../../../../store/hooks';

export interface IPaymentCheckoutMobileProps {
}

export function PaymentCheckoutMobile() {
  const { control } = useFormPaymentContext();


  // const fullName = useWatch({ control, name: 'fullName' });
  // const phone = useWatch({ control, name: 'phone' });
  // const address = useWatch({ control, name: 'address' });
  // const note = useWatch({ control, name: 'note' });

  // const dataInformationCheckout = {
  //   fullName,
  //   phone,
  //   address,
  //   note
  // }
  // const encryptedData = btoa(JSON.stringify(dataInformationCheckout));
  // localStorage.setItem('checkout-info', encryptedData);


  return (
    <form action="" >
      <div className="flex flex-col gap-2">
        <div className="col-span-1">
          <InputField name="fullName" control={control} label="Họ tên người nhận" />
        </div>
        <div className="col-span-1">
          <InputField name="phone" control={control} label="Số điện thoại người nhận" />
        </div>
        <div className="col-span-1">
          <InputField name="address" control={control} label="Địa chỉ người nhận" />
        </div>
        <div className="col-span-1">
          <CustomTextareaField name='note' control={control} label='Ghi chú' />
        </div>
      </div>
    </form>
  );
}
