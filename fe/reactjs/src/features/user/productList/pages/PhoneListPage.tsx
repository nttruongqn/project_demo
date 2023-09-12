import * as React from 'react';
import { ListBreadcrumb } from '../../../../components/User/Common/ListBreadcrumb';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { productListActions, selectProductForUser, selectProductListFilter, selectProductListLoading, selectProductListPagination } from '../productList.slice';
import { BrandProductFilter } from '../components/BrandProductFilter';
import { ListParams } from '../../../../models/common';
import { TitleProductListFilter } from '../components/TitleProductListFilter';
import { ProductListData } from '../components/ProductListData';
import { ViewMore } from '../components/ViewMore';
import { Product } from '../../../../models';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { FaFilter } from 'react-icons/fa';
import { Filter } from '../components/Filter';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { SyncLoader } from 'react-spinners';
import { Category } from '../../home/components/Category';
import { useButtonCategory } from '../../../../store/hooks';

export function PhoneListPage() {
  const DIENTHOAI = 'Điện thoại'
  const filter = useAppSelector(selectProductListFilter);
  const loading = useAppSelector(selectProductListLoading);
  const productListForUser = useAppSelector(selectProductForUser);
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectProductListPagination);
  const { totalItems, currentPage } = pagination;
  const [waitingData, setWaitingData] = React.useState<boolean>(false);
  const [totalProducts, setTotalProducts] = React.useState<Product[]>([]);
  const [remountNumber, setRemountNumber] = React.useState<number>(0);
  const [isShowViewMore, setIsShowViewMore] = React.useState<boolean>(false);
  const [isShowFilter, setIsShowFilter] = React.useState<boolean>(false);
  const [isFilterCheckbox, setIsFilterCheckbox] = React.useState<boolean>(false);
  // const [checkboxElements, setCheckboxElements] = React.useState<CheckboxElements>();
  const { checkboxElements, phoneListFilterPrice, isShowCategory } = useButtonCategory();


  React.useEffect(() => {
    setTimeout(() => {
      setWaitingData(true)
    }, 1000)
  })

  React.useEffect(() => {
    const newFilter = {
      ...filter,
      categoryType: DIENTHOAI,
    }
    dispatch(productListActions.fetchProductList(newFilter))
  }, [dispatch, filter])

  const handleFilter = (newFilter: ListParams) => {
    setIsShowViewMore(false)
    setTotalProducts([])
    dispatch(productListActions.setFilterWithDebounce(newFilter))
    setIsFilterCheckbox(false)
  }

  const handleFilterCheckbox = (newFilter: ListParams) => {
    setIsShowViewMore(false)
    setTotalProducts([])
    setIsFilterCheckbox(true)
    dispatch(productListActions.setFilterWithDebounce(newFilter))
  }

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
  }, [totalItems, productListForUser, setRemountNumber])
  return (
    <>
      <Helmet title='Điện thoại'>
        {checkboxElements && isShowCategory && <Category data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
        <ListBreadcrumb categoryType='Điện thoại' />
        <div className="flex justify-between max-md:flex-col max-md:gap-2 max-md:justify-center">
          <BrandProductFilter filter={filter} onChange={handleFilter} handleShowFilter={() => setIsShowFilter(false)} />

          <div className="flex gap-1 items-center border bg-white px-2 cursor-pointer round-sm max-md:hidden">
            <span className='text-[12px]'><FaFilter color='#333' /></span>
            <span className='text-sm' onClick={() => setIsShowFilter(!isShowFilter)}> Bộ lọc </span>
          </div>
          <div className="md:hidden mx-2">
            <div className="items-center inline-flex border p-1 bg-white gap-1 cursor-pointer">
              <span className='text-[12px]'><FaFilter color='#333' /></span>
              <span className='text-sm' onClick={() => setIsShowFilter(!isShowFilter)}> Bộ lọc </span>
            </div>
          </div>
        </div>
        {isShowFilter && (<Filter checkboxElements={checkboxElements as CheckboxElements} onCheckbox={handleFilterCheckbox} filter={filter} />)}
        {/* {isShowFilterMobile && (<FilterMobile checkboxElements={checkboxElements as CheckboxElements}/>)} */}
        <div className="flex flex-col md:my-2 md:bg-white md:px-4 md:pb-4">
          <TitleProductListFilter titleName='Điện thoại' onChange={handleFilter} filter={filter} productList={productListForUser} />
          {waitingData ? (
            <>
              {productListForUser && productListForUser.length > 0 && (<ProductListData productList={productListForUser} loading={loading} />)}
              {(productListForUser.length === 0 && isFilterCheckbox) && (
                <><div className="max-md:bg-white max-md:mx-2 max-md:p-2 max-md:mb-1">
                  <span className='text-sm'>Không tìm thấy sản phẩm</span></div></>
              )}
              {isShowViewMore && remountNumber > 0 && productListForUser && <ViewMore filter={filter} onPageChange={handlePageChange} remountNumber={remountNumber} currentPage={currentPage} />}
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 max-md:my-4">
                <SyncLoader color="#b91c1c" size={5} />
                <span className='font-bold text-sm'> Vui lòng chờ tải dữ liệu </span>
              </div>
            </>
          )}
        </div>
      </Helmet>
    </>
  );
}
