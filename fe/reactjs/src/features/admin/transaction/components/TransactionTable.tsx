import * as React from 'react';
import { TransactionOrder } from '../../../../models/transaction-order.model';
import { ListParams } from '../../../../models/common';
import { formatCurrency, formatCurrencyReplace } from '../../../../core/formatCurrency';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Product } from '../../../../models';
import { select } from 'redux-saga/effects';

export interface ITransactionTableProps {
  transactionList: TransactionOrder[];
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onRemove: (transaction: TransactionOrder) => void;
  onChangeStatus: (transaction: TransactionOrder) => void;
}

export function TransactionTable({ transactionList, filter, onChange, onRemove, onChangeStatus }: ITransactionTableProps) {
  const [open, setOpen] = React.useState(false);
  const [selectTransaction, setSelectTransaction] = React.useState<TransactionOrder>();
  const [isShowDelete, setIsShowDelete] = React.useState<Boolean>(false);
  const [isShowOrder, setIsShowOrder] = React.useState<Boolean>(false);
  const COMPLETE = 'Đã xử lý'
  const INCOMPLETE = 'Chưa xử lý'


  const titleDelete = "Xác nhận xoá giao dịch này ?";
  const titleInfoOrder = "Chi tiết mã đơn hàng";

  const handleClose = () => {
    setOpen(false);
  };

  const handleSortStatus = (event: React.MouseEvent<HTMLElement>) => {
    if (!onChange) return;
    const value = event.currentTarget.getAttribute('data-value');
    const [sort, order] = (value as string).split(".");
    const newFilter: ListParams = {
      ...filter,
      sort: sort || undefined,
      order: (order as "ASC") || "DESC" || undefined,
      page: 1
    }
    onChange(newFilter)
  }

  const handleRemoveClick = (transaction: TransactionOrder) => {
    setSelectTransaction(transaction);
    setOpen(true);
    setIsShowDelete(true);
    setIsShowOrder(false)
  };


  const handleShowOrderClick = (transaction: TransactionOrder) => {
    setSelectTransaction(transaction);
    setOpen(true);
    setIsShowDelete(false);
    setIsShowOrder(true)
  };

  const handleRemoveConfirm = (transaction: TransactionOrder) => {
    onRemove?.(transaction);
    setOpen(false);
  };


  const handleChangeStatusConfirm = (transaction: TransactionOrder) => {
    onChangeStatus?.(transaction);
    setOpen(false);
  };



  return (
    <>
      <table className="table-auto mt-4 w-full">
        <thead className="bg-gray-100 w-full">
          <tr className="w-full items-center">
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tên</span>
                <span className="flex flex-col gap-1.5 ">
                  <span data-value='fullName.ASC' onClick={handleSortStatus}><i className="ri-arrow-up-s-fill relative top-2.5 " ></i></span>
                  <span data-value='fullName.DESC' onClick={handleSortStatus} ><i className="ri-arrow-down-s-fill relative bottom-2.5 "></i></span>
                </span>
              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Địa chỉ</span>
                <span className="flex flex-col gap-1.5">
                  <span data-value='address.ASC' onClick={handleSortStatus}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                  <span data-value='address.DESC' onClick={handleSortStatus}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Số điện thoại</span>
              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Thanh toán</span>
                <span className="flex flex-col gap-1.5">
                  <span data-value='totalPrice.ASC' onClick={handleSortStatus}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                  <span data-value='totalPrice.DESC' onClick={handleSortStatus}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Trạng thái</span>

              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tạo</span>
                <span className="flex flex-col gap-1.5">
                  <span data-value='createdAt.ASC' onClick={handleSortStatus}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                  <span data-value='createdAt.DESC' onClick={handleSortStatus}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Thao tác</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((item) => (<tr className="w-full items-center" key={item.id}>
            <td className="border-b border-r p-3 text-start">
              {item.fullName}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.address}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.phone}
            </td>
            <td className="border-b border-r p-3 text-start">
              {formatCurrencyReplace(item.totalAmount)}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.status}
            </td>
            <td className="border-b border-r p-3 text-start">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
            <td className="border-b border-r p-3 text-start">
              <div className="flex gap-2">
                <button className="btn-edit bg-teal-500 text-sm p-2 text-white rounded-sm" onClick={() => handleShowOrderClick(item)}>
                  Xem
                </button>
                <button
                  className="btn-edit bg-red-500 text-sm p-2 text-white rounded-sm"
                  onClick={() => handleRemoveClick(item)}
                >
                  Xoá
                </button>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
        fullWidth
      >
        {
          isShowDelete && (
            <>
              <DialogTitle id="alert-dialog-title">
                {titleDelete}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Xác nhận xoá đơn hàng của {selectTransaction?.fullName} ? <br />
                  Sau khi xoá không thể khôi phục.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="error" variant="outlined" >Huỷ</Button>
                <Button onClick={() => handleRemoveConfirm(selectTransaction as TransactionOrder)} color="warning" variant="outlined" autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </>
          )}

        {isShowOrder && (
          <>
            <DialogTitle id="alert-dialog-title">
              {titleInfoOrder + ` ${selectTransaction?.fullName} `}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <table className="table-auto mt-4 w-full">
                  <thead className="bg-gray-100 w-full">
                    <tr className="w-full items-center">
                      <th className="w-[20%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Sản phẩm</span>

                        </div>
                      </th>
                      <th className="w-[10%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Hình ảnh</span>

                        </div>
                      </th>
                      <th className="w-[10%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Giá</span>
                        </div>
                      </th>
                      <th className="w-[10%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Số lượng</span>
                        </div>
                      </th>
                      <th className="w-[10%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Thành tiền</span>
                        </div>
                      </th>
                      <th className="w-[10%] border-b border-r p-3 text-start">
                        <div className="th__content w-full flex items-center gap-2">
                          <span>Khuyến mãi</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectTransaction?.orders.map((item) => (
                      <tr className="w-full items-center" key={item.id}>
                        <td className="border-b border-r p-3 text-start">
                          {item.product.name}
                        </td>
                        <td className="border-b border-r p-3 text-start">
                          <img src={item.product.imageUrl} className="w-[100px] h-[100px] object-contain border" alt='' />
                        </td>
                        <td className="border-b border-r p-3 text-start">
                          {formatCurrency(item.product.price)}
                        </td>
                        <td className="border-b border-r p-3 text-start">
                          {item.quantity}
                        </td>
                        <td className="border-b border-r p-3 text-start">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="border-b border-r p-3 text-start">
                          {item.product.isSale ? 'Có' : 'Không'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined" >Đóng</Button>
              {selectTransaction?.status === INCOMPLETE && <Button onClick={() => handleChangeStatusConfirm(selectTransaction as TransactionOrder)} color="warning" variant="outlined" autoFocus>
                Hoàn tất đơn hàng
              </Button>}
              {selectTransaction?.status === COMPLETE && <Button color="success" variant="contained" autoFocus>
                Đã hoàn tất
              </Button>}


            </DialogActions>
          </>
        )
        }
      </Dialog>
    </>
  );
}

