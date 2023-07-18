import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { ProductFeature } from "../features/admin/product";
import { CategoryFeature } from "../features/admin/category";
import { UserFeature } from "../features/admin/user";
import { TransactionFeature } from "../features/admin/transaction";
export interface MainProps {}

export function AdminMain() {
  return (
    <>
    <div className="main h-full w-5/6 overflow-y-auto">
        <Routes>
          {/* <Route path="dashboard" element={<Dashboard />}></Route> */}
          <Route path="categories/*" element={<CategoryFeature />}></Route>
          <Route path="products/*" element={<ProductFeature />}></Route>
          <Route path="users/*" element={<UserFeature />}></Route>
          <Route path="transactions/*" element={<TransactionFeature />}></Route>
        </Routes>
      </div>
    </>      
  );
}