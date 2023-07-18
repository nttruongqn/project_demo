import * as React from "react";
import { Product } from "../../../../models";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ListParams } from "../../../../models/common";
import { formatCurrency } from "../../../../core/formatCurrency";

export interface ProductTableProps {
  productList: Product[];
  onEdit?: (product: Product) => void;
  onRemove?: (product: Product) => void;
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
}

export function ProductTable({
  productList,
  onEdit,
  onRemove,
  filter,
  onChange
}: ProductTableProps) {
  const [open, setOpen] = React.useState(false);
  const [selectProduct, setSelectProduct] = React.useState<Product>();
  const titleDelete = "Xác nhận xoá danh mục này ?";

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (product: Product) => {
    setSelectProduct(product);
    setOpen(true);
  };

  const handleRemoveConfirm = (product: Product) => {
    onRemove?.(product);
    setOpen(false);
  };

  const handleSortType = (event: React.MouseEvent<HTMLElement>) => {
    if(!onChange) return;
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

  return (
    <>
      <table className="table-auto mt-4 w-full">
        <thead className="bg-gray-100 w-full">
          <tr className="w-full items-center">
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Id</span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tên</span>
                <span className="flex flex-col gap-1.5 ">
                  <span data-value='name.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5 " ></i></span>
                  <span data-value='name.DESC' onClick={handleSortType} ><i className="ri-arrow-down-s-fill relative bottom-2.5 "></i></span>
                </span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Giá</span>
                <span className="flex flex-col gap-1.5">
                <span data-value='price.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                <span data-value='price.DESC' onClick={handleSortType}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Ảnh</span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tạo</span>
                <span className="flex flex-col gap-1.5">
                <span data-value='createdAt.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                <span data-value='createdAt.DESC' onClick={handleSortType}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Cập nhật</span>
                <span className="flex flex-col gap-1.5">
                <span data-value='updatedAt.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                <span data-value='updatedAt.DESC' onClick={handleSortType}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Thao tác</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item) => (
            <tr className="w-full items-center" key={item.id}>
              <td className="border-b border-r p-3 text-start">
                {item.id}
              </td>
              <td className="border-b border-r p-3 text-start">
                {item.name}
              </td>
              <td className="border-b border-r p-3 text-start">
                {formatCurrency(item.price)}
              </td>
              <td className="border-b border-r p-3 text-start">
                <img src={item.imageUrl} className="w-[100px] h-[100px] object-contain border" alt={item.image} />
              </td>
              <td className="border-b border-r p-3 text-start">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="border-b border-r p-3 text-start">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>
              <td className="border-b border-r p-3 text-start">
                <div className="flex gap-2">
                  <button className="btn-edit bg-teal-500 text-sm p-2 text-white rounded-sm" onClick={() => onEdit?.(item)}>
                    Sửa
                  </button>
                  <button
                    className="btn-edit bg-red-500 text-sm p-2 text-white rounded-sm"
                    onClick={() => handleRemoveClick(item)}
                  >
                    Xoá
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleDelete}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xác nhận xoá {selectProduct?.name} ? <br />
            Sau khi xoá không thể khôi phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined" >Huỷ</Button>
          <Button onClick={() => handleRemoveConfirm(selectProduct as Product)} color="warning" variant="outlined" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
