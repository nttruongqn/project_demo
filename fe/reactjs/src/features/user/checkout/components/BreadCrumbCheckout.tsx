import * as React from 'react';

export function CheckoutBreadCrumb() {
    return (
            <div className="flex items-center w-full md:my-2">
                <span className="text-xltext-red-700 md:text-md" onClick={() => window.location.href='/'}><i className="ri-arrow-left-s-fill"></i></span>
                <p className="text-sm text-red-700 mb-1 md:text-md">Tiếp tục mua hàng</p>
            </div>
    );
}
