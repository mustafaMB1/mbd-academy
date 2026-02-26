"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assest/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import EmailCopy from "./copyEmailInHeader";
import PhoneCopy from "./copyNumberInHeader";

export default function Header() {
  const phoneNumber = "0952684662";
  const message = "Hello! I’d like to know more about your services.";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const otherLocale = currentLocale === "ar" ? "en" : "ar";

  const newPath =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
      ? `/${otherLocale}/`
      : pathname.replace(/^\/(ar|en)/, `/${otherLocale}`);

  useEffect(() => {
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLocale;

    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [currentLocale]);

  // ✅ اقفل قائمة الموبايل عند تغيير الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  const headerFont = currentLocale === "ar" ? "font-[Tajawal]" : "font-sans";

  return (
    <header className={`${headerFont} fixed top-0 left-0 w-full z-50`}>
      <div className="relative">
        {/* Base */}
        <div className="absolute inset-0 bg-[#070A16]" />

        {/* Gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-600/35 via-purple-600/25 to-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-fuchsia-600/20 blur-3xl" />

        {/* dotted hint */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />

        {/* Glass container */}
        <div className="relative border-b border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            {/* Top bar */}
            <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center  md:justify-between">
              {/* Logo */}
              <Link
                href={`/${currentLocale}/`}
                className="flex items-center justify-center gap-3"
              >
                <div className="relative flex h-12 md:h-13 w-36 md:w-40 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
                  <Image
                    src={logo}
                    alt="logo"
                    className=" h-40 md:h-30 w-32 md:w-40 object-contain"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(217,70,239,0.18)]" />
                </div>

                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">
                    {currentLocale === "ar" ? "أكادمية MBD" : "MBD Academy"}
                  </div>
                  <div className="text-xs text-white/60">
                    {currentLocale === "ar"
                      ? "تعلّم. تطوّر. انطلق."
                      : "Learn. Grow. Launch."}
                  </div>
                </div>
              </Link>

              {/* Contact + CTA */}
              <div className="flex w-full md:w-auto flex-wrap items-center gap-2 md:gap-4 justify-start md:justify-end">
                {/* Email chip */}
                <div className="rounded-2xl bg-white/[0.05] hidden md:block text-white px-3 py-2 md:py-1 ring-1 ring-white/10 hover:ring-white/40 transition">
                  <EmailCopy currentLocale={currentLocale} />
                </div>

                {/* Phone chip */}
                <div className="rounded-2xl bg-white/[0.05] hidden md:block text-white px-3 py-2 md:py-1 ring-1 ring-white/10 hover:ring-white/40 transition">
                  <PhoneCopy currentLocale={currentLocale} />
                </div>

                {/* Apply CTA (desktop only) */}
                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hidden md:inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white
                  btn-primary shadow-[0_0_30px_rgba(217,70,239,0.25)]
                  hover:shadow-[0_0_45px_rgba(34,211,238,0.25)] transition"
                >
                  <span className="opacity-95 group-hover:opacity-100">
                    {currentLocale === "ar" ? "قدّم الآن" : "Apply Now"}
                  </span>
                </a>
              </div>
            </div>

            {/* Nav row */}
            <div className="flex items-center justify-between py-3">
              {/* Desktop links */}
              <ul className="hidden md:flex items-center gap-2">
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
                    <li key={index}>
                      <Link
                        href={href}
                        className={`relative inline-flex items-center rounded-2xl px-3 md:px-4 py-2 text-sm font-medium transition
                          ${
                            isActive
                              ? "text-white bg-white/[0.06] ring-1 ring-white/15"
                              : "text-white/70 hover:text-white hover:bg-white/[0.05] ring-1 ring-transparent hover:ring-white/10"
                          }`}
                      >
                        {isActive && (
                          <span
                            className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]
                              ${currentLocale === "ar" ? "ml-2" : "mr-2"}
                            `}
                          />
                        )}
                        {text}
                      </Link>
                    </li>
                  );
                })}

                {hasToken && (
                  <li>
                    <Link
                      href={`/${currentLocale}/admin`}
                      className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] ring-1 ring-transparent hover:ring-white/10 transition"
                    >
                      {currentLocale === "ar" ? "لوحة التحكم" : "Dashboard"}
                    </Link>
                  </li>
                )}
              </ul>

              {/* Right actions */}
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* Login/Logout */}
                {!hasToken ? (
                  <Link
                    href={`/${currentLocale}/login`}
                    className="inline-flex items-center justify-center rounded-2xl px-3 md:px-4 py-2 text-sm font-semibold
                    text-white/90 bg-white/[0.05] ring-1 ring-white/10
                    hover:ring-white/20 hover:bg-white/[0.08] transition"
                  >
                    {currentLocale === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-2xl px-3 md:px-4 py-2 text-sm font-semibold
                    text-rose-200 bg-rose-500/10 ring-1 ring-rose-400/20
                    hover:bg-rose-500/15 hover:ring-rose-300/30 transition"
                  >
                    {currentLocale === "ar" ? "تسجيل الخروج" : "Logout"}
                  </button>
                )}

                {/* Language switch */}
                <Link
                  href={newPath}
                  className="inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold
                  text-white/80 bg-white/[0.03] ring-1 ring-white/10
                  hover:bg-white/[0.06] hover:text-white transition"
                >
                  {currentLocale === "ar" ? "English" : "العربية"}
                </Link>

                {/* Mobile menu */}
                <button
                  className="md:hidden inline-flex items-center justify-center rounded-2xl p-3
                  bg-white/[0.04] ring-1 ring-white/10 hover:ring-white/20 transition"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  <span className="text-white">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu (glass panel) */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-4">
                <div className="grid gap-2">
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
                        key={index}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition
                          ${
                            isActive
                              ? "text-white bg-white/[0.07] ring-1 ring-white/15"
                              : "text-white/75 bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.06]"
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {text}
                          {isActive && (
                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(217,70,239,0.28)]" />
                          )}
                        </span>
                        <span className="text-white/30">›</span>
                      </Link>
                    );
                  })}

                  {hasToken && (
                    <Link
                      href={`/${currentLocale}/admin`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/75 bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.06] transition"
                    >
                      {currentLocale === "ar" ? "لوحة التحكم" : "Dashboard"}
                      <span className="text-white/30">›</span>
                    </Link>
                  )}

                  {/* Mobile Apply CTA */}
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white
                    bg-gradient-to-r from-fuchsia-500/90 via-purple-500/90 to-cyan-400/80
                    shadow-[0_0_30px_rgba(217,70,239,0.25)]
                    hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]
                    transition"
                  >
                    {currentLocale === "ar" ? "قدّم الآن" : "Apply Now"}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}