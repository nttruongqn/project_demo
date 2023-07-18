import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductDetailPage } from './pages/ProductDetailPage';

export function ProductDetailFeature() {
    return (
            <Routes>
                <Route path=":slug" element={<ProductDetailPage />} />
            </Routes>
    );
}
