import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/admin/auth/pages/LoginPage";
import { PrivateAdminRoute } from "./components/Admin/Common/PrivateAdminRoute";
import { AdminLayout } from "./components/Admin/Layout/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />}/>          
      <Route path="admin/*" element={<PrivateAdminRoute />}>
          <Route path="" element={<AdminLayout />} />
        </Route>
    </Routes>
  );
}

export default App;
