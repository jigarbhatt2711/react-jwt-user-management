import { useEffect, useState } from 'react';
import { apiService } from '../../services/apiService';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import User from './user';

const USERS_PER_PAGE = 10;

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const [user, setUser] = useState(0);

  const showDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * USERS_PER_PAGE;
        const response = await apiService({
          method: "GET",
          url: "/users",
          params: { limit: USERS_PER_PAGE, skip },
        });

        if (response.status !== 200) {
          console.error("Failed to fetch users. Status:", response.status);
          return;
        }

        setUsers(response.data.users || []);
        setTotalUsers(response.data.total || 0);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  // Generates page numbers with ellipsis, e.g. [1, '...', 4, 5, 6, '...', 20]
  const getPageNumbers = () => {
    const delta = 1; // how many pages to show around current page
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">User</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Age</th>
              <th className="text-left px-6 py-4">Birthdate</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
                <tr key={i} className="border-b animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </td>
                </tr>
              ))
            ) : (
              users.map((user) => (
                <tr key={user?.email} className="border-b hover:bg-gray-50">
                  <User user={user} showDetails={showDetails} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({totalUsers} users)
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="First page"
            >
              <FaAngleDoubleLeft size={14} />
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Previous page"
            >
              <FaAngleLeft size={14} />
            </button>

            {getPageNumbers().map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 border rounded ${page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Next page"
            >
              <FaAngleRight size={14} />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Last page"
            >
              <FaAngleDoubleRight size={14} />
            </button>
          </div>
        </div>
      )}
      {/* User detail popup */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <div className="flex items-center gap-5 border-b pb-5">
              <img
                src={selectedUser.image}
                alt={selectedUser.firstName}
                className="w-24 h-24 rounded-full border"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>

                <p className="text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p className="font-semibold">{selectedUser.age}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <p className="font-semibold">{selectedUser.gender}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">{selectedUser.phone}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Birth Date</p>
                <p className="font-semibold">{selectedUser.birthDate}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <p className="font-semibold">{selectedUser.username}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Blood Group</p>
                <p className="font-semibold">{selectedUser.bloodGroup}</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-semibold">
                  {selectedUser.address?.address},
                  {" "}
                  {selectedUser.address?.city},
                  {" "}
                  {selectedUser.address?.state},
                  {" "}
                  {selectedUser.address?.country}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Company</p>
                <p className="font-semibold">
                  {selectedUser.company?.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-semibold">
                  {selectedUser.company?.department}
                </p>
              </div>

            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Users