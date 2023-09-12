import * as React from 'react';
import { CartCheckoutMobile } from '../components/CartCheckoutMobile';
import { CartCheckout } from '../components/CartCheckout';
import { PaymentCheckout } from '../components/PaymentCheckout';
import { TotalCheckout } from '../components/TotalCheckout';
import { useAuth, useButtonCategory, useShoppingCart } from '../../../../store/hooks';
import { TransactionModel } from '../../../../models/transaction.model';
import { orderApi } from '../../../../api/orderApi';
import { CartItemModel } from '../../../../models/cartItem.model';
import { CheckoutBreadCrumb } from '../components/BreadCrumbCheckout';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { Category } from '../../home/components/Category';

export interface ICheckoutProps {
}

export function CheckoutPage(props: ICheckoutProps) {
    const { user } = useAuth();
    const { totalDefault, totalSale, cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity, totalPrice, removeFromCart } = useShoppingCart();
    const [isShowOrderInformation, setIsShowOrderInformation] = React.useState(false);
    const { isShowCategory, checkboxElements, phoneListFilterPrice, resetButton } = useButtonCategory();

    React.useEffect(() => {
        resetButton()
    }, [])


const showOrderInformation = () => {
    setIsShowOrderInformation(true);
}

const handleOrder = async (formValues: TransactionModel) => {
    if (user != null) {
        formValues.userId = user.id
    }
    const cartItemsData: CartItemModel[] = cartItems.map((item) => {
        return {
            productId: item.id,
            productName: item.name,
            productImageUrl: item.imageUrl,
            totalQuantity: item.quantity,
            isSale: item.isSale,
            sale: item.sale
        }
    })
    const data = {
        cartItems: cartItemsData,
        transaction: formValues
    }

    try {
        await orderApi.order(data);
        localStorage.removeItem('cart');
        window.location.reload();
    } catch (error) {
        console.log('err', error)
    }
}

return (
    <>
    <Helmet title='Trang thanh toán'>
    {checkboxElements && isShowCategory &&<Category data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
        <main className="min-h-[600px] md:min-h-[820px] md:bg-slate-100 max-md:bg-white">
            <div className="container">
                <div className="max-md:px-2 md:py-2">
                    <CheckoutBreadCrumb />
                    <div className="max-md:hidden grid grid-cols-3 gap-4">
                        {/* <!-- left --> */}
                        <div className="col-span-2 flex flex-col">
                            <CartCheckout quantity={cartQuantity} cartItems={cartItems} increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity} removeFromCart={removeFromCart} />

                            {isShowOrderInformation && <PaymentCheckout onSubmit={handleOrder} user={user} />}
                        </div>
                        {/* <!-- right --> */}
                        <div className="col-span-1">
                            <TotalCheckout user={user} totalPrice={totalPrice} quantity={cartQuantity} showOrderInformation={showOrderInformation} isShowOrderInformation={isShowOrderInformation} onSubmit={handleOrder} />
                        </div>
                    </div>
                    <CartCheckoutMobile user={user} onSubmit={handleOrder} quantity={cartQuantity} cartItems={cartItems} increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity} totalPrice={totalPrice} totalDefault={totalDefault} totalSale={totalSale} removeFromCart={removeFromCart} />
                </div>
            </div>
        </main>
    </Helmet>
    </>
);
}
