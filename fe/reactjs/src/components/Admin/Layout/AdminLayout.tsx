import { SideBar } from "../Common/Sidebar";
import { AdminMain } from "../../../pages/AdminMain";

export function AdminLayout() {
  return (
    <>
      {/* <Header /> */}
      <div className="flex h-screen">
        <SideBar />
        <AdminMain />
      </div>
    </>
  );
}
