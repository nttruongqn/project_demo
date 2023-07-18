import * as React from "react";
import { ListPageHeader } from "../../../../components/Admin/Common/ListPageHeader";
import { CategoryFilter } from "../components/CategoryFilter";
import { CategoryTable } from "../components/CategoryTable";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  categoryActions,
  selectCategoryFilter,
  selectCategoryList,
  selectCategoryPagination,
} from "../category.slice";
import { ListParams } from "../../../../models/common";
import { Box, Pagination } from "@mui/material";
import { Category } from "../../../../models";
import { categoryApi } from "../../../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "../../../../components/Helmet/Helmet";

export interface ListPageProps { }

export function ListPage(props: ListPageProps) {
  const categoryList = useAppSelector(selectCategoryList);
  const filter = useAppSelector(selectCategoryFilter);
  const pagination = useAppSelector(selectCategoryPagination)
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(categoryActions.fetchCategoryList(filter));
  }, [dispatch, filter]);

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(categoryActions.setFilterWithDebounce(newFilter));
  };

  const handlePageChange = (e: any, page: number) => {
    dispatch(categoryActions.setFilter({
      ...filter,
      page: page
    }))
  }

  const handleRemoveCategory = async (category: Category) => {
    try {
      await categoryApi.delete(category?.id || '')
      const newFilter = { ...filter }
      dispatch(categoryActions.setFilter({ newFilter }))
    } catch (error) {
      console.log('Delete failed')
    }
  }

  const handleEditCategory = (category: Category) => {
    navigate(`${category.id}`);
  }

  return (
    <>
      <Helmet title="Danh mục">
        <div className="category__list-wrapper w-full h-full flex flex-col justify-between">
          <ListPageHeader title="Danh mục" btnContent="+ Thêm danh mục" linkButton="add" showBtn={true} />
          <div className="category__list-center w-full p-5 h-[90%]">
            <div className="category__list-main shadow-md p-3 z-10">
              <CategoryFilter
                filter={filter}
                onSearchChange={handleSearchChange}
              />
              <CategoryTable categoryList={categoryList} onRemove={handleRemoveCategory} onEdit={handleEditCategory
              } />
              <Box mt={2} display="flex" justifyContent="flex-end" >
                <Pagination count={pagination.totalPages} page={pagination.currentPage} variant="outlined" shape="rounded" onChange={handlePageChange} />
              </Box>
            </div>
          </div>
          {/* <div className="category__list-bottom border-t h-[10%]">footer</div> */}
        </div>
      </Helmet>
    </>
  );
}
