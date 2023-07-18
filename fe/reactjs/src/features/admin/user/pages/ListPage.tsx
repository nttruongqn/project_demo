import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUserFilter, selectUserList, selectUserPagination, userActions } from '../user.slice';
import { ListParams } from '../../../../models/common';
import { ListPageHeader } from '../../../../components/Admin/Common/ListPageHeader';
import { UserFilter } from '../components/UserFilter';
import { UserTable } from '../components/UserTable';
import { User } from '../../../../models';
import { Box } from '@mui/joy';
import { Pagination } from '@mui/material';
import { Helmet } from '../../../../components/Helmet/Helmet';

export interface IListPageProps {
}

export function ListPage(props: IListPageProps) {
  const userList: User[] = useAppSelector(selectUserList);
  const filter = useAppSelector(selectUserFilter);
  const pagination = useAppSelector(selectUserPagination);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(userActions.fetchUserList(filter))
  }, [dispatch, filter])

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(userActions.setFilterWithDebounce(newFilter));
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(userActions.setFilterWithDebounce(newFilter));
  }

  const handlePageChange = (e: any, page: number) => {
    dispatch(userActions.setFilter({
      ...filter,
      page: page
    }))
  }

  const handleRemoveUser = async(user: User) => {
    try {
      console.log('handle delete')
    } catch (error) {
      console.log("Delete Failed")
    }
  }


  return (
    <>
      <Helmet title="Tài khoản">
      <div className="w-full h-full flex flex-col justify-between">
        <ListPageHeader
          title="Người dùng"
        />
        <div className="w-full p-5 h-[90%]">
          <div className="shadow-md p-3 z-10">
            <UserFilter filter={filter} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
            <UserTable filter={filter} onChange={handleFilterChange} userList={userList} onRemove={handleRemoveUser}/>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </Box>
          </div>
        </div>
      </div>
      </Helmet>
    </>
  );
}
