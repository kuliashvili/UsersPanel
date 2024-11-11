"use client";

import { useState, useEffect } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import homeIcon from "@/public/images/house.svg";
import SearchIcon from "@/public/images/search.svg";
import PlusIcon from "@/public/images/plus.svg";
import FilterIcon from "@/public/images/filter.svg";
import ArrowIcon from "@/public/images/arrow.svg";
import Button from "@/components/ui/button";

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
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold">
                  <div className="flex items-center">
                    {t("table.fullName")}
                    <Image
                      src={ArrowIcon}
                      alt="Sort"
                      width={16}
                      height={16}
                      className="ml-2.5"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold">
                  <div className="flex items-center">
                    {t("table.gender")}
                    <Image
                      src={ArrowIcon}
                      alt="Sort"
                      width={16}
                      height={16}
                      className="ml-2.5"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold">
                  <div className="flex items-center">
                    {t("table.birthday")}
                    <Image
                      src={ArrowIcon}
                      alt="Sort"
                      width={16}
                      height={16}
                      className="ml-2.5"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold">
                  <div className="flex items-center">
                    {t("table.status")}
                    <Image
                      src={ArrowIcon}
                      alt="Sort"
                      width={16}
                      height={16}
                      className="ml-2.5"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold">
                  <div className="flex items-center">
                    {t("table.createdDate")}
                    <Image
                      src={ArrowIcon}
                      alt="Sort"
                      width={16}
                      height={16}
                      className="ml-2.5"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-base text-[#6B6E7F] font-semibold"></th>
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
        {/* Edit User Modal */}
        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-[540px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#6B6E7F]">
                  {t("modal.title")}
                </h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L13 13M1 13L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#6B6E7F] mb-2">
                      {t("modal.fullName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.fullNamePlaceholder")}
                      value={`${editingUser.firstName} ${editingUser.lastName}`}
                      onChange={(e) => {
                        const [firstName, ...lastNameParts] =
                          e.target.value.split(" ");
                        setEditingUser({
                          ...editingUser,
                          firstName,
                          lastName: lastNameParts.join(" ") || "",
                        });
                      }}
                      className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9B500]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6B6E7F] mb-2">
                      {t("modal.gender")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.genderPlaceholder")}
                      value={editingUser.gender}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          gender: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9B500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#6B6E7F] mb-2">
                      {t("modal.birthday")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.birthdayPlaceholder")}
                      value={editingUser.birthDate}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          birthDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9B500]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6B6E7F] mb-2">
                      {t("modal.status")}
                    </label>
                    <div className="relative">
                      <select
                        value={editingUser.status}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            status: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9B500] appearance-none bg-white"
                      >
                        <option value="Active">{t("modal.active")}</option>
                        <option value="Inactive">{t("modal.inactive")}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="#6B6E7F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => handleUpdateUser(editingUser)}
                  className="bg-[#C9B500] text-white hover:bg-[#B89A00]"
                >
                  {t("modal.add")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
