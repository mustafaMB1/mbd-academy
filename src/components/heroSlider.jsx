"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

// غيّرها لصورتك (يفضل تكون hero عريضة)
import heroBg from "../assest/mbd-hero.png";

export default function HeroSlider() {
  const t = useTranslations("Home");

  // ✅ عدّل IDs حسب أقسامك في الصفحة الرئيسية
  const coursesSectionId = "courses-section";
  const servicesSectionId = "services-section";

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <section className="relative mt-[112px] md:mt-[157px] overflow-hidden bg-[#070A16] before:absolute before:top-0 before:left-0 before:bg-black/40 before:w-full before:h-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay like the example */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A16]/95 via-[#070A16]/70 to-[#070A16]/20" />
        {/* subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
      </div>

      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid min-h-[78vh] items-center py-12 md:py-16">
          {/* Content (Left side) */}
          <div className="max-w-3xl">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
              <span>{t("heroBadge")}</span>
            </div>

            {/* Big title */}
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              {t("heroTitleMain")}
              <span className="block text-white/90">{t("heroTitleSub")}</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
              {t("heroDesc")}
            </p>

            {/* CTA Box (like the example under title) */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]">
              {/* Accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500/90 via-purple-500/70 to-cyan-400/80" />

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-white">
                  {t("heroCtaTitle")}
                </h3>
                <p className="mt-2 text-sm md:text-base text-white/75 max-w-2xl">
                  {t("heroCtaDesc")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {/* زر استكشف كورساتنا */}
                  <button
                    type="button"
                    onClick={() => scrollToSection(coursesSectionId)}
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm md:text-base font-bold text-white
                    bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)]
                    shadow-[0_0_30px_rgba(217,70,239,0.25)] hover:shadow-[0_0_45px_rgba(34,211,238,0.22)]
                    transition"
                  >
                    استكشف كورساتنا التدريبية
                  </button>

                  {/* زر استكشف خدماتنا */}
                  <button
                    type="button"
                    onClick={() => scrollToSection(servicesSectionId)}
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm md:text-base font-bold
                    text-white/90 bg-white/[0.06] ring-1 ring-white/12
                    hover:bg-white/[0.10] hover:ring-white/20 transition"
                  >
                    استكشف خدماتنا
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070A16] to-transparent" />
    </section>
  );
}