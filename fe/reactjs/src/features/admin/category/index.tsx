import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { AddEditPage } from './pages/AddEditPage';

export interface CategoryProps {
}

export function CategoryFeature (props: CategoryProps) {
  return (
    <>
    <Routes>
    <Route path="" element={<ListPage />}></Route>
    <Route path="add" element={<AddEditPage />}/>
    <Route path=":categoryId" element={<AddEditPage />} />
  </Routes>
    </>
  )
}