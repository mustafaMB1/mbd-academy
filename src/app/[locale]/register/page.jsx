"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // حفظ المستخدم بالـ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === formData.email);

    if (exists) {
      setMessage(t("exists"));
    } else {
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      setMessage(t("success"));
      setTimeout(() => router.push(`/${router.locale}/admin/auth/login`), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen md:mt-[166px] flex items-center justify-center bg-gray-100 font-[Tajawal]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--main-color)] mb-6">
          {t("registerTitle")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder={t("username")}
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
            required
          />
          <input
            name="email"
            type="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
            required
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
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
            {loading ? t("loading") : t("register")}
          </button>
        </form>

        {message && <p className="text-green-600 mt-3">{message}</p>}

        <p className="text-gray-600 text-sm mt-6">
          {t("haveAccount")}{" "}
          <Link
            href={`/${router.locale}/admin/auth/login`}
            className="text-[var(--main-color)] font-semibold hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
