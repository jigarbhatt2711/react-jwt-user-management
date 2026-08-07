import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h2>
      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b">
          <h3 className="text-xl font-semibold">
            Recent Activity
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">User</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Role</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "John Doe",
                  email: "john@example.com",
                  status: "Active",
                  role: "Admin",
                },
                {
                  name: "Jane Smith",
                  email: "jane@example.com",
                  status: "Pending",
                  role: "Editor",
                },
                {
                  name: "Alex Brown",
                  email: "alex@example.com",
                  status: "Inactive",
                  role: "User",
                },
              ].map((user) => (
                <tr
                  key={user.email}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}