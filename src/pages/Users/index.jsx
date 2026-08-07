import { useEffect, useState, useMemo, useCallback } from 'react';
import { apiService } from '../../services/apiService';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaSearch,
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

  const [searchInput, setSearchInput] = useState('');   // raw input value
  const [searchQuery, setSearchQuery] = useState('');    // debounced value actually used to fetch

  // useMemo: derive total pages only when totalUsers changes (cheap, but keeps deps explicit)
  const totalPages = useMemo(
    () => Math.ceil(totalUsers / USERS_PER_PAGE),
    [totalUsers]
  );

  const isSearching = searchQuery.trim().length > 0;

  const showDetails = useCallback((user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Debounce: wait 400ms after the user stops typing before updating searchQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1); // reset to page 1 whenever the search term changes
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // useCallback: stable fetch function, only changes when its actual inputs change
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * USERS_PER_PAGE;

      const response = isSearching
        ? await apiService({
            method: "GET",
            url: "/users/search",
            params: { q: searchQuery, limit: USERS_PER_PAGE, skip },
          })
        : await apiService({
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
  }, [currentPage, isSearching, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const goToPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      setCurrentPage(page);
    },
    [totalPages, currentPage]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // useMemo: recompute page-number list only when currentPage/totalPages change,
  // not on every render (e.g. not on every keystroke while searching)
  const pageNumbers = useMemo(() => {
    const delta = 1;
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
  }, [currentPage, totalPages]);

  return (
    <div>
      {/* Search bar */}
      <div className="flex items-center gap-2 px-6 py-4">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search users (e.g. John)"
            className="w-full pl-9 pr-8 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

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
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  No users found{isSearching ? ` for "${searchQuery}"` : ''}.
                </td>
              </tr>
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

            {pageNumbers.map((page, idx) =>
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
                  {selectedUser.address?.address},{" "}
                  {selectedUser.address?.city},{" "}
                  {selectedUser.address?.state},{" "}
                  {selectedUser.address?.country}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Company</p>
                <p className="font-semibold">{selectedUser.company?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-semibold">{selectedUser.company?.department}</p>
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

export default Users;