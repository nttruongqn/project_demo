import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../../../features/admin/auth/auth.slice";

const sideBarMenu = [
  { name: "Tổng quan", hef: "/admin/dashboard", icon: "ri-bar-chart-fill" },
  { name: "Danh mục", hef: "/admin/categories", icon: "ri-list-check" },
  { name: "Sản phẩm", hef: "/admin/products", icon: "ri-store-fill" },
];

const sideBarBottomMenu = [
  { name: "Tài khoản", hef: "/admin/abc", icon: "ri-account-circle-fill" },
];

export function SideBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }
  const activeLink = "bg-blue-100 p-2 text-lg m-2 rounded-md text-blue-500";
  const inactiveLink = "text-lg p-2 m-2 text-gray-500";


  return (
    <>
      <div className="flex flex-col sidebar w-1/6 border-r border-slate ">
        <div className="sidebar__top h-1/6 flex items-center sidebar__logo px-4 border-b">
          <h1 className="font-bold text-2xl text-blue-800"> Admin </h1>
        </div>

        <div className="sidebar__center h-5/6 border-b">
          <ul className="flex flex-col justify-center">
            {sideBarMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.hef}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                <div className="flex items-center ">
                  <span className="mr-2 text-md">
                    <i className={item.icon}></i>
                  </span>
                  <span className="text-md">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="sidebar__bottom flex flex-col py-2 text-gray-500 h-1/6">
          <ul className="flex flex-col justify-between">
            {sideBarBottomMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.hef}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg">
                    <i className={item.icon}></i>
                  </span>
                  <span className="text-md">{item.name}</span>
                </div>
              </NavLink>
            ))}
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                isActive ? activeLink : inactiveLink
              }
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <span className="mr-2 text-lg">
                  <i className="ri-arrow-left-circle-fill"></i>
                </span>
                <span className="text-md">Đăng xuất</span>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}
