"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FaChalkboardTeacher, FaUserGraduate, FaBook, FaMedal } from "react-icons/fa";
import avatar from '../assest/mbd-avatar.png.jpg'
export default function FeaturesSection() {
  const t = useTranslations("features");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // ✅ ضع الصورة داخل public (مثلاً: public/images/mbd-avatar.png)
  // const imgSrc = "../src/assest/mbd-avatar.png";

  const items = useMemo(() => {
    return [
      {
        id: 1,
        Icon: FaChalkboardTeacher,
        title: t("cards.0.title"),
        desc: t("cards.0.desc"),
        tag: t("cards.0.tag"),
      },
      {
        id: 2,
        Icon: FaUserGraduate,
        title: t("cards.1.title"),
        desc: t("cards.1.desc"),
        tag: t("cards.1.tag"),
      },
      {
        id: 3,
        Icon: FaBook,
        title: t("cards.2.title"),
        desc: t("cards.2.desc"),
        tag: t("cards.2.tag"),
      },
      {
        id: 4,
        Icon: FaMedal,
        title: t("cards.3.title"),
        desc: t("cards.3.desc"),
        tag: t("cards.3.tag"),
      },
    ];
  }, [t]);

  const active = items[current];

  const next = () => setCurrent((p) => (p + 1) % items.length);
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);

  const stopAuto = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  useEffect(() => {
    stopAuto();
    intervalRef.current = window.setInterval(() => {
      setCurrent((p) => (p + 1) % items.length);
    }, 5200);

    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <section dir={isArabic ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#070A16] py-14">
      {/* dotted */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />

      {/* blobs */}
      <div className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/28 via-purple-600/18 to-cyan-400/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/16 via-blue-500/14 to-fuchsia-600/18 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-stretch gap-6 md:grid-cols-12">
          {/* LEFT: Image (reverse of hero) */}
          <div className="relative  md:col-span-6 lg:col-span-6">
            <div className="relative h-[42vh] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#00000063] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] md:h-[100%]">
              <Image
                src={avatar}
                alt="MBD Avatar"
                fill
                className="object-cover"
                priority
              />

              {/* subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070A16]/20 via-transparent to-[#070A16]/5" />

              {/* neon rim */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[0_0_55px_rgba(34,211,238,0.10)]" />

              {/* badge */}
              <div className="absolute top-5 left-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
                <span className="text-white/60">{t("imageBadge")}</span>{" "}
                <span className="font-semibold text-white">MBD</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Vertical gradient panel + feature slider */}
          <div className="relative  md:col-span-6 lg:col-span-6">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              {/* ✅ vertical gradient from top to bottom */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/20 via-purple-500/10 to-cyan-400/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />

              <div className="relative p-6 sm:p-8">
                {/* section title */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(217,70,239,0.22)]" />
                      <span>{t("badge")}</span>
                    </div>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                      {t("title")}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
                      {t("subtitle")}
                    </p>
                  </div>

                  {/* mini controls */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => {
                        stopAuto();
                        prev();
                      }}
                      className="h-11 w-11 rounded-2xl bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/20 transition text-white/80"
                      aria-label="prev"
                    >
                      {isArabic ? "›" : "‹"}
                    </button>
                    <button
                      onClick={() => {
                        stopAuto();
                        next();
                      }}
                      className="h-11 w-11 rounded-2xl bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/20 transition text-white/80"
                      aria-label="next"
                    >
                      {isArabic ? "‹" : "›"}
                    </button>
                  </div>
                </div>

                {/* slider card */}
                <div className="mt-7">
                  <div key={active.id} className="animate-[fadeUp_.55s_ease_both]">
                    <div className="rounded-[26px] border border-white/10 bg-[#0B1022]/55 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="h-14 w-14 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center">
                            <active.Icon size={26} className="text-white" />
                          </div>
                          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.18)]" />
                        </div>

                        <div className="flex-1">
                          <div className="inline-flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
                            {active.tag}
                          </div>

                          <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white">
                            {active.title}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">
                            {active.desc}
                          </p>

                          {/* progress */}
                          <div className="mt-5">
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
                                style={{
                                  width: `${((current + 1) / items.length) * 100}%`,
                                }}
                              />
                            </div>
                            <div className="mt-2 text-xs text-white/55">
                              {t("progress", { current: current + 1, total: items.length })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* dots */}
                      <div className="mt-6 flex items-center gap-2">
                        {items.map((it, idx) => (
                          <button
                            key={it.id}
                            onClick={() => {
                              stopAuto();
                              setCurrent(idx);
                            }}
                            aria-label={`feature-${idx + 1}`}
                            className={
                              idx === current
                                ? "h-2.5 w-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.20)] transition-all"
                                : "h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/35 transition-all"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

     
              </div>
            </div>

            {/* fade animation */}
            <style jsx global>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}