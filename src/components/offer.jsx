"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  FaShieldAlt,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSchool,
  FaPalette,
  FaFutbol,
} from "react-icons/fa";

export default function WhatWeOffer() {
  const t = useTranslations("WhatWeOffer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const items = [
    { key: "safety", Icon: FaShieldAlt, title: t("safetyTitle"), desc: t("safetyDesc") },
    { key: "regular", Icon: FaBookOpen, title: t("regularTitle"), desc: t("regularDesc") },
    { key: "teachers", Icon: FaChalkboardTeacher, title: t("teachersTitle"), desc: t("teachersDesc") },
    { key: "classrooms", Icon: FaSchool, title: t("classroomsTitle"), desc: t("classroomsDesc") },
    { key: "creative", Icon: FaPalette, title: t("creativeTitle"), desc: t("creativeDesc") },
    { key: "sports", Icon: FaFutbol, title: t("sportsTitle"), desc: t("sportsDesc") },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#070A16] py-14 md:py-18"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/22 via-purple-600/16 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/14 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* title */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
            {t("title")}
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            {t("subtitle")}
          </p>
        </div>

        {/* diamonds */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center">
            {items.map((item, idx) => (
              <DiamondCard key={item.key} item={item} idx={idx} isArabic={isArabic} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiamondCard({ item, idx, isArabic }) {
  const { Icon, title, desc } = item;

  // Offset for nice layout on lg
  const lift =
    idx % 3 === 1 ? "lg:-translate-y-6" : idx % 3 === 2 ? "lg:translate-y-6" : "";

  // ✅ mobile tap tooltip
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div ref={rootRef} className={`group relative ${lift} transition-transform duration-300`}>
      {/* diamond */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          relative
          h-36 w-36
          cursor-pointer
          sm:h-40 sm:w-40
          rotate-45
          rounded-[22px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          shadow-[0_0_35px_rgba(0,0,0,0.25)]
          transition
          hover:border-white/20
          hover:bg-white/[0.06]
          focus:outline-none
        "
        aria-label={title}
      >
        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-b from-fuchsia-500/18 via-purple-500/10 to-cyan-400/14 opacity-90" />

        {/* content */}
        <div className="absolute inset-0 -rotate-45 flex flex-col items-center justify-center p-4 text-center">
          <div className="mb-3 h-12 w-12 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(217,70,239,0.14)] group-hover:shadow-[0_0_34px_rgba(34,211,238,0.18)] transition">
            <Icon className="text-white" size={20} />
          </div>

          <div className="text-sm sm:text-[15px] font-bold text-white line-clamp-1">
            {title}
          </div>

          {/* ✅ وصف صغير داخل المعين (خفيف) */}
          <div className="mt-1 text-[11px] text-white/65 line-clamp-2 hidden sm:block">
            {desc}
          </div>
        </div>

        {/* glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[0_0_55px_rgba(34,211,238,0.07)]" />
      </button>

      {/* ✅ Tooltip: يعمل hover على desktop + tap على mobile */}
      <div
        className={`
          absolute
          ${isArabic ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"}
          -bottom-12
          z-20
          w-[220px]
          transition
          ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}
          md:opacity-0 md:translate-y-1 md:pointer-events-none
          md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto
        `}
      >
        <div className="rounded-2xl bg-[#0B1022]/92 ring-1 ring-white/10 px-4 py-3 text-xs text-white/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.3)]">
          <div className="font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-white/65 leading-relaxed">{desc}</div>
        </div>
      </div>
    </div>
  );
}