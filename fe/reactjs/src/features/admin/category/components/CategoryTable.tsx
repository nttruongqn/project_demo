import * as React from "react";
import { Category } from "../../../../models";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface CategoryTableProps {
  categoryList: Category[];
  onEdit?: (category: Category) => void;
  onRemove?: (category: Category) => void;
}

export function CategoryTable({
  categoryList,
  onEdit,
  onRemove,
}: CategoryTableProps) {
  const [open, setOpen] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState<Category>();
  const titleDelete = "Xác nhận xoá danh mục này ?";

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (category: Category) => {
    setSelectCategory(category);
    setOpen(true);
  };

  const handleRemoveConfirm = (category: Category) => {
    onRemove?.(category)
    setOpen(false);
  };



  return (
    <>
      <table className="table-auto mt-4 w-full">
        <thead className="bg-gray-100 w-full">
          <tr className="w-full items-center">
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Id</span>
              </div>
            </th>
            <th className="w-[15%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tên</span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Slug</span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Tạo</span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Cập nhật</span>
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
          {categoryList.map((item) => (
            <tr className="w-full items-center" key={item.id}>
              <td className="w-[15%] border-b border-r p-3 text-start">
                {item.id}
              </td>
              <td className="w-[10%] border-b border-r p-3 text-start">
                {item.name}
              </td>
              <td className="w-[20%] border-b border-r p-3 text-start">
                {item.slug}
              </td>
              <td className="w-[20%] border-b border-r p-3 text-start">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="w-[20%] border-b border-r p-3 text-start">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>
              <td className="w-[10%] border-b border-r p-3 text-start">
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
            Xác nhận xoá {selectCategory?.name} ? <br />
            Sau khi xoá không thể khôi phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined" >Huỷ</Button>
          <Button onClick={() => handleRemoveConfirm(selectCategory as Category)} color="warning" variant="outlined" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
