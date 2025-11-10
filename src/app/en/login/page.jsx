"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/baseUrl";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // استخراج التوكن من الردّ
      const { access_token } = response.data;

      // حفظ التوكن في localStorage
      localStorage.setItem("token", access_token);

      // ✅ نقل المستخدم إلى الصفحة الرئيسية (العربية)
      router.push("/ar");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Invalid login credentials."); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 font-[Tajawal]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--main-color)] mb-6">
           log in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder={"mail"}
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
            required
          />
          <input
            name="password"
            type="password"
            placeholder={"password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--main-color)] text-white py-3 rounded-md font-semibold hover:bg-[var(--secondary-color-1)] transition"
          >
            {loading ? "sending..." : "login"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 ${
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
