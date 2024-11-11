"use client";

import { useState, useEffect } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import homeIcon from "@/public/images/house.svg";
import SearchIcon from "@/public/images/search.svg";
import PlusIcon from "@/public/images/plus.svg";
import FilterIcon from "@/public/images/filter.svg";

export default function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();

      const enhancedUsers = data.users.map((user) => ({
        ...user,
        status: Math.random() > 0.5 ? "Active" : "Inactive",
        createdDate: "07/20/2022",
      }));

      setUsers(enhancedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedData } : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        {t("loading")}...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-[#6B6E7F] text-xl">
        <span>{t("dashboard.users")}</span>
        <span className="mx-3 text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <Image src={homeIcon} alt="Home" width={18} height={18} />
          <span className="mx-1">•</span>
          <span>{t("breadcrumbs.dashboard")}</span>
          <span className="mx-1">•</span>
          <span>{t("dashboard.users")}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div
          className="px-6 py-4 border-b"
          style={{ backgroundColor: "#C9B5001A" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center" style={{ color: "#6B6E7F" }}>
              <h2 className="text-xl font-semibold">
                {t("table.usersOverview")}
              </h2>
              <p className="ml-4 text-xs">{t("table.Overview")}</p>{" "}
              <div className="relative ml-8">
                <input
                  type="text"
                  placeholder={t("table.search")}
                  className="pl-10 pr-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none text-sm rounded-[15px] w-full"
                />
                <Image
                  src={SearchIcon}
                  alt="Search Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  width={14}
                  height={14}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className=" text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src={FilterIcon}
                  alt="Filter Icon"
                  width={20}
                  height={20}
                />
              </button>
              <button className="bg-[#C9B500] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#B89A00]">
                <Image
                  src={PlusIcon}
                  alt="Add User Icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("table.fullName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("table.gender")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("table.birthday")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("table.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("table.createdDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {t(`table.${user.gender}`)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(user.birthDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t(`table.${user.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.createdDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {t("table.editUser")}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("table.fullName")}
                  </label>
                  <input
                    type="text"
                    value={`${editingUser.firstName} ${editingUser.lastName}`}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("table.gender")}
                  </label>
                  <select
                    value={editingUser.gender}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="male">{t("table.male")}</option>
                    <option value="female">{t("table.female")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("table.status")}
                  </label>
                  <select
                    value={editingUser.status}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Active">{t("table.active")}</option>
                    <option value="Inactive">{t("table.inactive")}</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  {t("table.cancel")}
                </button>
                <button
                  onClick={() => handleUpdateUser(editingUser)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {t("table.saveChanges")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
