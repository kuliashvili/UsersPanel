"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import background from "../../../public/images/background.png";
import PersonIcon from "../../../public/images/person.svg";
import LockerIcon from "../../../public/images/locker.svg";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

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
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div
        className="w-full max-w-md px-8 py-3 bg-white rounded-lg shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="flex justify-center mt-2 mb-10">
          <Image src={Logo} alt="Binary Forge Logo" width={360} height={100} />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8">Admin Panel</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="contact@binary-forge.dev"
              icon={PersonIcon} 
            />
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="********"
              icon={LockerIcon}
            />
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" disabled={loading}>
              {loading ? "LOADING..." : "LOGIN"}
            </Button>
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
