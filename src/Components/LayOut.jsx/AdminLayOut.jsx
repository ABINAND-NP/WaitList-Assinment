import { Outlet } from "react-router-dom";
import AdminSideBar from '../Admin/AdminSideBar';

const AdminLayOut = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F7FA]">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden pt-2 pb-5 pr-2">
        <main className="flex flex-col flex-1 min-w-0 h-full bg-[#FFFFFF] rounded-lg overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayOut;