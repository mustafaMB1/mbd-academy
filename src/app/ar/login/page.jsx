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
      setMessage(
        error.response?.data?.message || "بيانات الدخول غير صحيحة."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070A16] px-4 text-white overflow-hidden">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/20 via-purple-600/15 to-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-fuchsia-600/15 blur-3xl" />

      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.4)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT IMAGE (DESKTOP) */}
        <div className="hidden lg:flex items-center justify-center relative p-10">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <Image
            src={photo}
            alt="Login Illustration"
            width={360}
            height={360}
            className="relative z-10 object-contain drop-shadow-2xl"
          />
        </div>

        {/* FORM */}
        <div className="relative px-10 py-14 flex flex-col justify-center">

          {loading && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex items-center gap-3 bg-white/[0.06] px-6 py-4 rounded-2xl ring-1 ring-white/10">
                <FaSpinner className="animate-spin" />
                جاري تسجيل الدخول...
              </div>
            </div>
          )}

          {/* Role Switch */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {["student", "teacher"].map((role) => (
              <button
                key={role}
                onClick={() => setTab(role)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                  tab === role
                    ? "bg-[var(--main-color)] text-white shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {role === "student" ? "Student" : "Teacher"}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-center mb-10">
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
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/35"
                required
              />
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="كلمة السر"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/35 pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/50 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-[var(--main-color)] text-white font-extrabold hover:bg-[var(--secondary-color-2)] transition disabled:opacity-60"
            >
              تسجيل الدخول
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center text-red-400 font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}