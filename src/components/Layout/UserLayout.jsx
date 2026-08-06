import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import UserHeader from "../UserHeader";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1">
        {/* Navbar */}
            <UserHeader />
            <Outlet />
        </main>
    </div>
  );
};

export default UserLayout;