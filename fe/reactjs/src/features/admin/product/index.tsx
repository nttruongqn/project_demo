import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddEditPage } from "./pages/AddEditPage";
import { ListPage } from "./pages/ListPage";
import { useAppDispatch } from "../../../app/hooks";
import { categoryActions } from "../category/category.slice";

export function ProductFeature() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(categoryActions.fetchCategoryAll());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="" element={<ListPage />}></Route>
        <Route path="add" element={<AddEditPage />}/>
        <Route path=":productId" element={<AddEditPage />} />
      </Routes>
    </>
  );
}
