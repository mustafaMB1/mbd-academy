"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-3">
        {t("title")}
      </h2>
      <p className="text-center text-gray-600 mb-10">
        {t("subtitle")}
      </p>

      <div className="space-y-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="text-lg font-semibold">{item.q}</span>
              <FaChevronDown
                className={`text-gray-500 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* CONTENT */}
            <div
              className={`px-5 overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-[300px] pb-5" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
