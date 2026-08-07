import React from "react";
import {
  FaReact,
  FaHome,
  FaUser,
  FaChartBar,
  FaCog,
  FaBell,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/");
  };

  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-4 ${isActive ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-800"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <FaReact className="text-4xl text-sky-400 animate-spin" />
        <h1 className="text-2xl font-bold !text-white">React Admin</h1>
      </div>

      <nav className="flex-1 mt-6">
        <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
        <NavItem to="/users" icon={<FaUser />} label="Users" />
        <NavItem to="/reports" icon={<FaChartBar />} label="Reports" />
        <NavItem to="/settings" icon={<FaCog />} label="Settings" />
      </nav>
      {/* <nav className="flex-1 mt-6">
        <a
          href="#"
          className="flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700"
        >
          <FaHome />
          Dashboard
        </a>

        <Link
          to="/users"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaUser />
          Users
        </Link>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaChartBar />
          Reports
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaCog />
          Settings
        </a>
      </nav> */}

      <button
        className="flex items-center gap-3 m-4 rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
