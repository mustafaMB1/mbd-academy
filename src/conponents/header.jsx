"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assest/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Header() {
  const phoneNumber = "0952684662"; 
  const message = "Hello! I’d like to know more about your services.";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 🔄 اللغة الحالية
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const otherLocale = currentLocale === "ar" ? "en" : "ar";

  // ✅ إنشاء الرابط الجديد عند تبديل اللغة
  const newPath =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
      ? `/${otherLocale}/`
      : pathname.replace(/^\/(ar|en)/, `/${otherLocale}`);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = currentLocale;
      const token = localStorage.getItem("token");
      setHasToken(!!token);
    }
  }, [currentLocale]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    router.push(`/${currentLocale}/`);
  };

  const navLinks = [
    { en: "Home", ar: "الرئيسية" },
    { en: "About", ar: "من نحن" },
    { en: "Courses", ar: "الدورات" },
    { en: "Trainers", ar: "المدربون" },
    { en: "Blog", ar: "المدونة" },
    { en: "Contact", ar: "اتصل بنا" },
  ];

  return (
    <header
      className={`md:fixed top-0 left-0 md:left-[10%] w-full md:w-[80%] z-50 bg-white border-b border-gray-200 ${
        currentLocale === "ar" ? "font-[Tajawal]" : "font-sans"
      }`}
    >
      {/* ✅ الشريط العلوي */}
      <div
        className={`flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-white ${
          currentLocale === "ar" ? "text-right" : "text-left"
        }`}
      >
        {/* الشعار */}
        <div className="flex items-center w-fit rounded-full bg-[var(--main-color)] gap-2">
          <Image src={logo} alt="logo" className="w-22 h-22" />
        </div>

        {/* معلومات التواصل */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-3 md:mt-0">
          {/* البريد */}
          <div className="flex items-center gap-2 transition">
            <FaPaperPlane
              className="text-[var(--secondary-color-1)]"
              size={18}
            />
            <div className="mb-[-22px] md:mb-[0px]">
              <p className="text-sm  font-semibold">
                {currentLocale === "ar" ? "البريد الإلكتروني" : "Email"}
              </p>
              <p className="text-gray-600 text-sm">
                mbdacademy2023@email.com
              </p>
            </div>
          </div>

          {/* الهاتف */}
          <div className="flex items-center gap-2 transition">
            <FaPhoneAlt className="text-[var(--secondary-color-1)]" size={18} />
            <div>
              <p className="text-sm font-semibold">
                {currentLocale === "ar" ? "اتصل بنا" : "Call"}
              </p>
              <p className="text-gray-600 text-sm">+963 991 519 824</p>
            </div>
          </div>

          {/* زر التقديم */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border hidden md:block border-[var(--main-color)] text-[var(--main-color)] px-4 py-2 rounded-md font-semibold hover:bg-[var(--main-color)] cursor-pointer hover:text-white transition"
          >
            {currentLocale === "ar" ? "قدّم الآن" : "Apply Now"}
          </a>
        </div>
      </div>

      {/* ✅ شريط التنقل */}
      <nav className="bg-[var(--main-color)] text-white px-6 py-3 flex items-center justify-between relative">
        {/* روابط سطح المكتب */}
        <ul
          className={`hidden md:flex items-center gap-6 text-sm font-medium ${
            currentLocale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {navLinks.map((link, index) => {
            const text = currentLocale === "ar" ? link.ar : link.en;
            const href =
              link.en === "Home"
                ? `/${currentLocale}/`
                : `/${currentLocale}/${link.en.toLowerCase()}`;
            const isActive =
              link.en === "Home"
                ? pathname === `/${currentLocale}` ||
                  pathname === `/${currentLocale}/`
                : pathname.endsWith(link.en.toLowerCase());

            return (
              <Link
                href={href}
                key={index}
                className={`cursor-pointer hover:text-[var(--secondary-color-1)] transition ${
                  isActive ? "text-[var(--secondary-color-1)]" : ""
                }`}
              >
                {text}
              </Link>
            );
          })}

          {hasToken && (
            <Link
              href={`/${currentLocale}/admin`}
              className="cursor-pointer hover:text-[var(--secondary-color-1)] transition"
            >
              {currentLocale === "ar" ? "لوحة التحكم" : "Dashboard"}
            </Link>
          )}
        </ul>

        {/* ✅ زر تسجيل الدخول / الخروج + تبديل اللغة */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between ">
          {!hasToken ? (
            <Link
              href={`/${currentLocale}/login`}
              className="border border-[var(--secondary-color-1)] text-[var(--secondary-color-1)] px-4 py-2 rounded-md font-semibold hover:bg-[var(--secondary-color-1)] hover:text-white transition"
            >
              {currentLocale === "ar" ? "تسجيل الدخول" : "Login"}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-md font-semibold hover:bg-red-500 hover:text-white transition"
            >
              {currentLocale === "ar" ? "تسجيل الخروج" : "Logout"}
            </button>
          )}

          {/* 🔘 زر تبديل اللغة الجديد */}
          <Link
            href={newPath}
            className="border border-white px-3 py-2 rounded-md font-semibold hover:bg-white hover:text-[var(--main-color)] transition"
          >
            {currentLocale === "ar" ? "English" : "العربية"}
          </Link>

          {/* زر القائمة للموبايل */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* قائمة الموبايل */}
        {menuOpen && (
          <div
            className={`absolute top-full left-0 w-full bg-[var(--main-color)] border-t border-gray-700 flex flex-col items-start px-6 py-4 space-y-3 md:hidden z-50 ${
              currentLocale === "ar" ? "text-right" : "text-left"
            }`}
          >
            {navLinks.map((link, index) => {
              const text = currentLocale === "ar" ? link.ar : link.en;
              const href =
                link.en === "Home"
                  ? `/${currentLocale}/`
                  : `/${currentLocale}/${link.en.toLowerCase()}`;
              const isActive =
                link.en === "Home"
                  ? pathname === `/${currentLocale}` ||
                    pathname === `/${currentLocale}/`
                  : pathname.endsWith(link.en.toLowerCase());

              return (
                <Link
                  href={href}
                  key={index}
                  className={`cursor-pointer hover:text-[var(--secondary-color-1)] transition ${
                    isActive ? "text-[var(--secondary-color-1)]" : ""
                  }`}
                >
                  {text}
                </Link>
              );
            })}

            {hasToken && (
              <Link
                href={`/${currentLocale}/admin`}
                className="cursor-pointer hover:text-[var(--secondary-color-1)] transition"
              >
                {currentLocale === "ar" ? "لوحة التحكم" : "Dashboard"}
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
