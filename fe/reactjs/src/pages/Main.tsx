import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../features/admin/dashboard";
import { ProductFeature } from "../features/admin/product";
import { CategoryFeature } from "../features/admin/category";
export interface MainProps {}

export function Main() {
  return (
    <>
    <div className="main w-5/6 h-screen">
        <Routes>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="categories/*" element={<CategoryFeature />}></Route>
          <Route path="products/*" element={<ProductFeature />}></Route>
        </Routes>
      </div>
    </>      
  );
}