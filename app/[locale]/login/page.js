"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import background from "../../../public/images/background.png";
import PersonIcon from "../../../public/images/person.svg";
import LockerIcon from "../../../public/images/locker.svg";
import EyeIcon from "../../../public/images/eye.svg";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      toast.error("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.accessToken) {
        document.cookie = `token=${data.accessToken}; path=/`;
        document.cookie = `user=${JSON.stringify({
          ...data,
          username: formData.username,
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

        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="john doe"
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
              placeholder="******"
              icon={LockerIcon}
            />
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" disabled={loading}>
              {loading ? "LOADING..." : "LOGIN"}
            </Button>
          </div>

          <div className="text-center" style={{ marginBottom: "16px" }}>
            <a
              href="#"
              className="text-sm text-black font-medium"
              style={{ fontSize: "16px" }}
              onClick={(e) => {
                e.preventDefault();
                toast.error("Feature currently unavailable.");
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
      <div className="text-center mt-auto text-sm text-white py-4 absolute bottom-0 left-0 right-0">
        Binary Forge © 2024 - Admin Panel
      </div>
    </div>
  );
}
