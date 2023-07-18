import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage';

export function CheckoutFeature() {
    return (
            <Routes>
                <Route path="" element={<CheckoutPage/>} />
            </Routes>
    );
}
