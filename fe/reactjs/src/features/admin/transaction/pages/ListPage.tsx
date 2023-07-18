import * as React from 'react';
import { ListPageHeader } from '../../../../components/Admin/Common/ListPageHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectTransactionFilter, selectTransactionList, selectTransactionPagination, transactionActions } from '../transaction.slice';
import { ListParams } from '../../../../models/common';
import { TransactionFilter } from '../components/TransactionFilter';
import { TransactionTable } from '../components/TransactionTable';
import { TransactionOrder } from '../../../../models/transaction-order.model';
import { Box, Pagination } from '@mui/material';
import { transactionApi } from '../../../../api/transactionApi';
import { Helmet } from '../../../../components/Helmet/Helmet';

export interface IListPageProps {
}

export function ListPage(props: IListPageProps) {
    const transactionList = useAppSelector(selectTransactionList);
    const filter = useAppSelector(selectTransactionFilter);
    const pagination = useAppSelector(selectTransactionPagination);
    const dispatch = useAppDispatch();


    React.useEffect(() => {
        dispatch(transactionActions.fetchTransactionList(filter))
    }, [dispatch, filter])

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(transactionActions.setFilterWithDebounce(newFilter));
    }

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(transactionActions.setFilterWithDebounce(newFilter));
    }

    const handlePageChange = (e: any, page: number) => {
        dispatch(transactionActions.setFilter({
            ...filter,
            page: page
        }))
    }

    const handleRemoveTransaction = async (transaction: TransactionOrder) => {
        try {
            await transactionApi.revokeTransaction(transaction.id)
            const newFilter = {...filter}
            dispatch(transactionActions.setFilter(newFilter))
        } catch (error) {
            console.log("Remove transaction failed")
        }
    }

    const handleChangeStatusTransaction = async (transaction: TransactionOrder) => {
        try {
            await transactionApi.changeStatusTransaction(transaction.id)
            const newFilter = {...filter}
            dispatch(transactionActions.setFilter(newFilter))
        } catch (error) {
            console.log("Change status failed")
        }
    }

    return (
        <>
        <Helmet title="Đơn hàng">
            <div className="w-full h-full flex flex-col justify-between">
                <ListPageHeader
                    title="Đơn hàng"
                />
                <div className="w-full p-5 h-[90%]">
                    <div className="shadow-md p-3 z-10">
                        <TransactionFilter filter={filter} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
                        <TransactionTable filter={filter} onChange={handleFilterChange} transactionList={transactionList} onRemove={handleRemoveTransaction} onChangeStatus={handleChangeStatusTransaction} />
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
