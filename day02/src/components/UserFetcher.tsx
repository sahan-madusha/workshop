import React, { useState } from "react";
import { User, UserApiResponse } from "../types";

export const UserFetcher: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>("");

  // Function to fetch users from Backend API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: UserApiResponse = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
      } else {
        throw new Error("Invalid response structure from backend");
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to fetch users. Make sure backend is running on http://localhost:8000",
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on ID search
  const filteredUsers = users.filter((user) => {
    if (!searchId.trim()) return true;
    return user.id.toString() === searchId.trim();
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <p className="text-xs text-gray-500">
            Fetch users from API (http://localhost:8000/api/users)
          </p>
        </div>

        {/* Button to call Backend API */}
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? "Fetching..." : "Fetch Users"}
        </button>
      </div>

      {/* Search by ID input */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="search-id"
          className="text-sm font-medium text-gray-700"
        >
          Search by ID:
        </label>
        <input
          id="search-id"
          type="number"
          placeholder="Enter User ID (e.g. 1)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
        />
        {searchId && (
          <button
            onClick={() => setSearchId("")}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
              <th className="py-2.5 px-4 border-r border-gray-200">ID</th>
              <th className="py-2.5 px-4 border-r border-gray-200">Name</th>
              <th className="py-2.5 px-4 border-r border-gray-200">Email</th>
              <th className="py-2.5 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2.5 px-4 border-r border-gray-200 font-mono text-xs">
                    {user.id}
                  </td>
                  <td className="py-2.5 px-4 border-r border-gray-200 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="py-2.5 px-4 border-r border-gray-200 text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full capitalize">
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-500 italic"
                >
                  {users.length === 0
                    ? 'No data fetched yet. Click "Fetch Users" button above.'
                    : `No user found with ID "${searchId}".`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
