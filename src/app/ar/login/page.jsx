"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      router.push("/ar");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("بيانات الدخول غير صحيحة.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-[Tajawal]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--main-color)] mb-6">
          تسجيل الدخول
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* حقل الإيميل */}
          <input
            name="email"
            type="email"
            placeholder="الايميل"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
            required
          />

          {/* حقل كلمة المرور */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="كلمة السر"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 hover:text-[var(--main-color)]"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-[var(--main-color)] text-white py-3 rounded-md font-semibold hover:bg-[var(--secondary-color-1)] transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" size={18} />
                جاري تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>

        {/* الرسالة */}
        {message && (
          <p
            className={`mt-4 ${
              message.includes("نجاح") || message.includes("Success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
