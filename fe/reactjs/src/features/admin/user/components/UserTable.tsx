import * as React from 'react';
import { User } from '../../../../models';
import { ListParams } from '../../../../models/common';

export interface IUserTableProps {
  userList: User[];
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onRemove: (user: User) => void;
}

export function UserTable({ userList, filter, onChange, onRemove }: IUserTableProps) {
  const [selectUser, setSelectUser] = React.useState<User>();
  const [open, setOpen] = React.useState(false);
  const titleDelete = "Xác nhận xoá danh mục này ?";

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (user: User) => {
    setSelectUser(user);
    setOpen(true);
  };

  const handleRemoveConfirm = (user: User) => {
    onRemove?.(user)
    setOpen(false);
  };
  console.log('list user', userList)

  const handleSortType = (event: React.MouseEvent<HTMLElement>) => {
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
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Username</span>
                <span className="flex flex-col gap-1.5 ">
                  <span data-value='username.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5 " ></i></span>
                  <span data-value='username.DESC' onClick={handleSortType} ><i className="ri-arrow-down-s-fill relative bottom-2.5 "></i></span>
                </span>
              </div>
            </th>
            <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Email</span>
                <span className="flex flex-col gap-1.5">
                  <span data-value='email.ASC' onClick={handleSortType}><i className="ri-arrow-up-s-fill relative top-2.5"></i></span>
                  <span data-value='email.DESC' onClick={handleSortType}> <i className="ri-arrow-down-s-fill relative bottom-2.5"></i></span>
                </span>
              </div>
            </th>
            <th className="w-[10%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Role</span>
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
            {/* <th className="w-[20%] border-b border-r p-3 text-start">
              <div className="th__content w-full flex items-center gap-2">
                <span>Thao tác</span>
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {userList.map((item) => (<tr className="w-full items-center" key={item.id}>
            <td className="border-b border-r p-3 text-start">
              {item.id}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.username}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.email}
            </td>
            <td className="border-b border-r p-3 text-start">
              {item.role?.name}
            </td>
            <td className="border-b border-r p-3 text-start">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
            <td className="border-b border-r p-3 text-start">
              {new Date(item.updatedAt).toLocaleDateString()}
            </td>
            {/* <td className="border-b border-r p-3 text-start">
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
            </td> */}
          </tr>))}


        </tbody>
      </table>
    </>
  );
}
