import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LaptopListPage } from './pages/LaptopListPage';
import { PhoneListPage } from './pages/PhoneListPage';

export function ProductListFeature () {
  return (
    <Routes>
        <Route path="dien-thoai.html" element={<PhoneListPage />}/>
        <Route path="may-tinh.html" element={<LaptopListPage />}/>
    </Routes>
  );
}
