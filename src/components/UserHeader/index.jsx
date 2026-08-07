import { FaBell, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserHeader = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div className="relative">

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
            src={user?.image || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;