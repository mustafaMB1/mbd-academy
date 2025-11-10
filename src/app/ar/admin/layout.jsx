"use client";

import React from "react";
import Link from "next/link";
import '../../[locale]/globals.css'

export default function AdminLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 min-h-screen font-[Tajawal]">
        {/* ⚙️ Layout خاص بلوحة التحكم */}
        <div className="flex min-h-screen">
          {/* ✅ الشريط الجانبي */}
          <aside className="w-64 bg-[var(--main-color)] text-white p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">
                لوحة التحكم
              </h2>
              <nav className="flex flex-col gap-3">
                <Link href="/ar/admin" className="hover:text-[var(--secondary-color-1)]">
                  الرئيسية
                </Link>
                <Link href="/ar/admin/courses" className="hover:text-[var(--secondary-color-1)]">
                  الدورات
                </Link>
                <Link href="/ar/admin/trainers" className="hover:text-[var(--secondary-color-1)]">
                  المدربون
                </Link>
                <Link href="/ar/admin/articles" className="hover:text-[var(--secondary-color-1)]">
                  المقالات
                </Link>
                <Link href="/ar/admin/feedback" className="hover:text-[var(--secondary-color-1)]">
                  التقييمات
                </Link>
                <Link href="/ar/admin/categories" className="hover:text-[var(--secondary-color-1)]">
                  التصنيفات
                </Link>
                <Link href="/ar/admin/pricing" className="hover:text-[var(--secondary-color-1)]">
                  خطط الأسعار
                </Link>
                <Link href="/ar/admin/levels" className="hover:text-[var(--secondary-color-1)]">
                  المستويات
                </Link>
                <Link href="/ar/admin/specialitis" className="hover:text-[var(--secondary-color-1)]">
                  الاختصاصات
                </Link>
                <Link href="/ar" className="hover:text-[var(--secondary-color-1)]">
                  الموقع
                </Link>
              </nav>
            </div>

            <div className="text-center border-t border-white/30 pt-4 text-sm opacity-80">
              © 2025 جميع الحقوق محفوظة
            </div>
          </aside>

          {/* ✅ المحتوى الرئيسي */}
          <main className="flex-1 bg-white p-6 shadow-inner overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
