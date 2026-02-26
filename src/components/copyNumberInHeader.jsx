"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function PhoneCopy({ currentLocale }) {
  const [copied, setCopied] = useState(false);

  const phone = currentLocale === "ar" ? "+٩٦٣ ٩٥٢ ٦٨٤ ٦٦٢" : "+963 952 684 662";
  const label = currentLocale === "ar" ? "اتصل بنا" : "Call";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      currentLocale === "ar"
        ? "+963 952 684 662" // النسخة التي تُنسخ بدون أرقام هندية
        : "+963 952 684 662"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer flex items-center gap-3 p-3 rounded-xl transition"
    >
      {/* النص */}
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-gray-600 text-sm">{phone}</p>
      </div>

      {/* أيقونة النسخ */}
      <div className="text-gray-600">
        {copied ? (
          <FaCheck className="text-green-600 text-lg" />
        ) : (
          <FaCopy className="text-gray-500 text-lg" />
        )}
      </div>
    </div>
  );
}
