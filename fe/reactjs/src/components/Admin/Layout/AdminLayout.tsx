import { SideBar } from "../Common/Sidebar";
import { Main } from "../../../pages/Main";
export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen h-auto container-fluid flex">
        <SideBar />
        <Main />
      </div>
    </>
  );
}
