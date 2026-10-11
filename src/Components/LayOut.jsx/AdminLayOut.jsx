import { Outlet } from "react-router-dom";
import AdminSideBar from '../Admin/AdminSideBar'

const AdminLayOut = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayOut;