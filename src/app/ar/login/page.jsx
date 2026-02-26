"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import photo from "../../../assest/zero-hero.png";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("student");

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
      setMessage(error.response?.data?.message || "بيانات الدخول غير صحيحة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#ece7ff] px-4 font-[Tajawal]">

      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative">

        {/* IMAGE ON MOBILE — CIRCLE WITH GLOW */}
        <div className="flex lg:hidden justify-center mt-8">
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-[#8d4bff]/40 blur-2xl rounded-full"></div>

            {/* Circle Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl border-[3px] border-white">
              <Image
                src={photo}
                alt="Login Illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* LEFT — DESKTOP IMAGE */}
        <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-[#7d40ff] to-[#9a6dff] p-6">

          <div className="absolute inset-0 bg-white/10 rounded-[100px] w-[90%] h-[85%] left-1/2 -translate-[5%] top-1/2 -translate-y-1/2 backdrop-blur-sm"></div>

          <Image
            src={photo}
            alt="Login Illustration"
            width={360}
            height={360}
            className="relative rounded-b-xl rotate-12 z-10 object-contain drop-shadow-2xl"
          />
        </div>

        {/* FORM */}
        <div className="px-10 py-14 flex flex-col justify-center bg-white">

          <div className="flex items-center justify-center gap-3 mb-8">
            {["student", "teacher"].map((role) => (
              <button
                key={role}
                onClick={() => setTab(role)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === role
                    ? "bg-[#7d40ff] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {role === "student" ? "Student" : "Teacher"}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-[#7d40ff] text-center mb-10 tracking-wide drop-shadow-sm">
            تسجيل الدخول
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="الايميل"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7d40ff] outline-none shadow-sm"
                required
              />
              <span className="absolute right-4 top-3 text-gray-400">📧</span>
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="كلمة السر"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7d40ff] outline-none shadow-sm pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-[#7d40ff]"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#7d40ff] text-white text-lg font-bold hover:bg-[#6c34e6] shadow-lg hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          {message && (
            <p
              className={`mt-5 text-center font-medium ${
                message.includes("نجاح") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
