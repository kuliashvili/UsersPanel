"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.accessToken) {
        document.cookie = `token=${data.accessToken}; path=/`;
        document.cookie = `user=${JSON.stringify({
          ...data,
          email: formData.email || "contact@binary-forge.dev",
        })}; path=/`;

        toast.success("Login successful!");
        router.push("/en/dashboard");
      } else {
        console.error("Login failed:", data);
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-8">Admin Panel</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="contact@binary-forge.dev"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Binary Forge © 2024 - Admin Panel
        </div>
      </div>
    </div>
  );
}
