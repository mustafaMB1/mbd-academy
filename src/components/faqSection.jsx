"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [openIndex, setOpenIndex] = useState(0);

  const data = useMemo(
    () => [
      { q: t("q1"), a: t("a1") },
      { q: t("q2"), a: t("a2") },
      { q: t("q3"), a: t("a3") },
      { q: t("q4"), a: t("a4") },
      { q: t("q5"), a: t("a5") },
      { q: t("q6"), a: t("a6") },
      { q: t("q7"), a: t("a7") },
    ],
    [t]
  );

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#070A16] py-14 md:py-18"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/20 via-purple-600/14 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
            FAQ
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-4">
          {data.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="
                  group rounded-[22px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-xl
                  shadow-[0_0_35px_rgba(0,0,0,0.25)]
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.05]
                "
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="
                    w-full flex items-center justify-between gap-4
                    p-5 sm:p-6 text-left
                    focus:outline-none
                  "
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          isOpen
                            ? "bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.22)]"
                            : "bg-white/25"
                        }`}
                      />
                      <span className="text-base sm:text-lg font-semibold text-white/90 line-clamp-2">
                        {item.q}
                      </span>
                    </div>

                    {/* progress line */}
                    <div className="mt-3 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 transition-all duration-500 ${
                          isOpen ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* icon */}
                  <div
                    className="
                      shrink-0 h-10 w-10 rounded-2xl
                      bg-white/[0.05] ring-1 ring-white/10
                      flex items-center justify-center
                      transition
                      group-hover:bg-white/[0.07]
                      group-hover:ring-white/20
                    "
                  >
                    <FaChevronDown
                      className={`text-white/75 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ${
                    isOpen ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-6">
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {item.a}
                    </p>

                    <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}