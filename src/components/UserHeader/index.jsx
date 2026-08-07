import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

const UserHeader = () => {
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(userData);

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   // console.log("before:", typeof userData);
  //   setUser(JSON.parse(userData));
  //   // console.log("after", typeof user);
  // }, []);

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={user?.profile_image || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">{user?.email}</h3>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
