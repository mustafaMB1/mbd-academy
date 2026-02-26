"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function EmailCopy({ currentLocale }) {
  const [copied, setCopied] = useState(false);

  const email = "mbdacademy2023@email.com";
  const label = currentLocale === "ar" ? "البريد الإلكتروني" : "Email";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer flex items-center justify-between gap-3 p-3 rounded-xl  transition mb-[-22px] md:mb-0"
    >
      {/* النص */}
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-gray-600 text-sm">{email}</p>
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
