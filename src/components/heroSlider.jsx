"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// غيّر المسار حسب مشروعك
import heroBg from "../assest/mbd-hero.png";

export default function HeroSlider() {
  const t = useTranslations("Home");
  const phoneNumber = "0952684662";

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const slides = useMemo(() => {
    return [
      {
        id: 1,
        message: "أريد ان استفسر عن الكورسات التي تقدمونها",
        title: t("titleslide1"),
        desc: t("descslide1"),
        btnText: t("btnTextslide1"),
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1900&q=80",
      },
      {
        id: 2,
        message: "أريد ان ابني موقع الكتروني ممكن مساعدة؟",
        title: t("titleslide2"),
        desc: t("descslide2"),
        btnText: t("btnTextslide2"),
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1900&q=80",
      },
    ];
  }, [t]);

  const active = slides[current];
  const waHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(active.message)}`;

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 6500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [slides.length]);

  const stopAuto = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  return (
    <section className="relative mt-37 overflow-hidden bg-[#070A16]">
      {/* dots background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />

      {/* blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/30 via-purple-600/20 to-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-fuchsia-600/20 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative grid min-h-[78vh] items-stretch gap-6 py-10 md:grid-cols-12 md:py-14">
          {/* LEFT */}
          <div className="relative md:col-span-6 lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
              <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 blur-3xl" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
                  <span>{t("heroBadge")}</span>
                </div>

                <div className="mt-6">
                  <div key={active.id} className="fade-up">
                    <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                      {active.title}
                    </h1>

                    <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                      {active.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={stopAuto}
                        className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-fuchsia-500/90 via-purple-500/90 to-cyan-400/80 shadow-[0_0_30px_rgba(217,70,239,0.25)] hover:shadow-[0_0_45px_rgba(34,211,238,0.25)] transition"
                      >
                        {active.btnText}
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          stopAuto();
                          next();
                        }}
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white/85 bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/20 transition"
                      >
                        {t("heroSecondaryBtn")}
                      </button>
                    </div>
                  </div>

                  {/* dots */}
                  <div className="mt-8 flex items-center gap-2">
                    {slides.map((s, idx) => (
                      <button
                        key={s.id}
                        aria-label={`slide-${idx + 1}`}
                        onClick={() => {
                          stopAuto();
                          setCurrent(idx);
                        }}
                        className={
                          idx === current
                            ? "h-2.5 w-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(217,70,239,0.25)] transition-all"
                            : "h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/35 transition-all"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* controls + mini preview */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="prev"
                      onClick={() => {
                        stopAuto();
                        prev();
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] ring-1 ring-white/10 hover:ring-white/25 hover:bg-white/[0.08] transition"
                    >
                      <span className="text-white/80">›</span>
                    </button>

                    <button
                      type="button"
                      aria-label="next"
                      onClick={() => {
                        stopAuto();
                        next();
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] ring-1 ring-white/10 hover:ring-white/25 hover:bg-white/[0.08] transition"
                    >
                      <span className="text-white/80">‹</span>
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-3 py-2">
                    <div className="h-9 w-9 overflow-hidden rounded-xl bg-white/10">
                      {active.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={active.img} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>

                    <div className="text-xs text-white/70">
                      <div className="text-white/85 font-semibold">{t("heroMiniLabel")}</div>
                      <div className="line-clamp-1">{active.message}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative md:col-span-6 lg:col-span-7">
            <div className="relative h-[44vh] overflow-hidden rounded-[28px] border border-white/10 md:h-full">
              <Image src={heroBg} alt="MBD Academy Hero" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/35 to-[#070A16]/70" />

              <div className="pointer-events-none absolute inset-x-0 bottom-10 h-24 opacity-80">
                <div className="absolute left-10 right-10 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/50 to-cyan-400/50 blur-[1px]" />
                <div className="absolute left-10 right-10 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-fuchsia-500/0 via-purple-500/40 to-cyan-400/40" />
              </div>

              <div className="absolute top-5 right-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
                <span className="text-white/60">{t("heroRightBadge")}</span>{" "}
                <span className="font-semibold text-white">MBD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070A16] to-transparent" />
    </section>
  );
}