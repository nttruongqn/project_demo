import { Box, Pagination } from "@mui/material";
import * as React from "react";
import { ListPageHeader } from "../../../../components/Admin/Common/ListPageHeader";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  productActions,
  selectProductFilter,
  selectProductList,
  selectProductPagination,
} from "../product.slice";
import { useNavigate } from "react-router-dom";
import { ListParams } from "../../../../models/common";
import { productApi } from "../../../../api/productApi";
import { Product } from "../../../../models";
import { ProductTable } from "../components/ProductTable";
import { ProductFilter } from "../components/ProductFilter";


export function ListPage() {
  const productList = useAppSelector(selectProductList);
  const filter = useAppSelector(selectProductFilter);
  const pagination = useAppSelector(selectProductPagination);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(productActions.fetchProductList(filter))
  },[dispatch, filter])

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilterWithDebounce(newFilter));
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilterWithDebounce(newFilter));
  }

  const handleRemoveProduct = async(product: Product) => {
    try {
      await productApi.delete(product?.id || '')
      const newFilter = {...filter}
      dispatch(productActions.setFilter(newFilter))
    } catch (error) {
      console.log("Delete Failed")
    }
  }

  const handleEditProduct = (product: Product) => {
    navigate(`${product.id}`)
  }

  return (
    <>
      <div className="product__list-wrapper w-full h-full flex flex-col justify-between">
        <ListPageHeader
          title="Sản phẩm"
          btnContent="+ Thêm sản phẩm"
          linkButton="add"
        />
        <div className="product__list-center w-full p-5 h-[90%]">
          <div className="product__list-main shadow-md p-3 z-10">
            <ProductFilter filter={filter} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
            <ProductTable  filter={filter} onChange={handleFilterChange} productList={productList} onRemove={handleRemoveProduct} onEdit={handleEditProduct}/>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </div>
        </div>
        {/* <div className="category__list-bottom border-t h-[10%]">footer</div> */}
      </div>
    </>
  );
}
