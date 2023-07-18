import * as React from 'react';
import { ListBreadcrumb } from '../../../../components/User/Common/ListBreadcrumb';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { productListActions, selectProductForUser, selectProductList, selectProductListFilter, selectProductListLoading, selectProductListPagination } from '../productList.slice';
import { BrandProductFilter } from '../components/BrandProductFilter';
import { ListParams } from '../../../../models/common';
import { TitleProductListFilter } from '../components/TitleProductListFilter';
import { ProductListData } from '../components/ProductListData';
import { ViewMore } from '../components/ViewMore';
import { Product } from '../../../../models';
import { Helmet } from '../../../../components/Helmet/Helmet';

export function PhoneListPage () {
  const DIENTHOAI = 'Điện thoại'
  const filter = useAppSelector(selectProductListFilter);
  const loading = useAppSelector(selectProductListLoading);
  const productList = useAppSelector(selectProductList);
  const productListForUser = useAppSelector(selectProductForUser);
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectProductListPagination);
  const { totalItems, currentPage } = pagination;
  const [totalProducts, setTotalProducts] = React.useState<Product[]>([]);
  const [remountNumber, setRemountNumber] = React.useState<number>(0);
  const [isShowViewMore, setIsShowViewMore] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const newFilter = {
      ...filter,
      categoryType: DIENTHOAI,
    }
    console.log('f', newFilter);
    dispatch(productListActions.fetchProductList(newFilter))
  },[dispatch, filter])

  const handleFilter = (newFilter: ListParams) => {
    setIsShowViewMore(false)
    setTotalProducts([])
    dispatch(productListActions.setFilterWithDebounce(newFilter))}

  const handlePageChange = (newFilter: ListParams) => {
    newFilter.checkFilter = false;
    dispatch(productListActions.setFilterWithDebounce(newFilter))    
  }


  React.useEffect(() => {
    const remountNumber = totalItems - productListForUser.length;
    setRemountNumber(remountNumber);
    setTimeout(() => {
      setIsShowViewMore(true)
    }, 1000)
  },[totalItems, productListForUser, setRemountNumber])

  return (
    <>
    <Helmet title='Điện thoại'>
    <ListBreadcrumb categoryType='Điện thoại' />
    <BrandProductFilter filter={filter} onChange={handleFilter}/>
    <div className="flex flex-col md:my-2 md:bg-white md:px-4 md:pb-4">
      <TitleProductListFilter  titleName='Điện thoại' onChange={handleFilter} filter={filter} />
      <ProductListData productList={productListForUser} loading = {loading}/>
    </div>
    {isShowViewMore && remountNumber > 0 && <ViewMore filter={filter} onPageChange={handlePageChange} remountNumber={remountNumber} currentPage={currentPage} />}
    </Helmet>
    </>
  );
}
