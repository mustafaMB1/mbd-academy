"use client";

import React from "react";
import '../../[locale]/globals.css'

export default function AdminLayout({ children }) {
  return (
    <html lang="ar" dir="ltr">
      <body className="bg-gray-100 min-h-screen font-[Tajawal]">

          {/* ✅ المحتوى الرئيسي */}
          <main className="flex-1 bg-white p-6 shadow-inner overflow-y-auto">
            {children}
          </main>
       
      </body>
    </html>
  );
}
