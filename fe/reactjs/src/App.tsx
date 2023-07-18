import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/admin/auth/pages/LoginPage";
import { PrivateAdminRoute } from "./components/Admin/Common/PrivateAdminRoute";
import { AdminLayout } from "./components/Admin/Layout/AdminLayout";
import { MainLayout } from "./components/User/Layout/MainLayout";
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="admin/*" element={<PrivateAdminRoute />}>
        <Route path="" element={<AdminLayout />} />
      </Route>
      <Route path="/*" element={<MainLayout />} />

    </Routes>
  );
}

export default App;
