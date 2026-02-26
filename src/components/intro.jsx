"use client";

import { useLocale, useTranslations } from "next-intl";

export default function Intro() {
  const t = useTranslations("Intro");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const stats = [
    { number: 7, label: t("teachers") },
    { number: 185, label: t("students") },
    { number: 13, label: t("courses") },
    { number: 12, label: t("awards") },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#070A16] py-14 md:py-18"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/20 via-purple-600/14 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-stretch gap-6 md:grid-cols-12">
          {/* Video */}
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.25)]">
              <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[0_0_55px_rgba(34,211,238,0.10)]" />

              <div className="p-4 sm:p-5">
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/HrwusO-MvWM?rel=0&autoplay=0&mute=1"
                      title="Intro Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
                    {t("badge")}
                  </span>
                  <span className="text-xs text-white/55">{t("hint")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-5">
            <div className="relative h-full rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.25)]">
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-fuchsia-500/16 via-purple-500/8 to-cyan-400/12 opacity-80" />

              <div className="relative p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
                  <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
                  {t("pill")}
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                  {t("title")}
                </h2>

                <div className="mt-5 space-y-4">
                  <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                    {t("desc1")}
                  </p>
                  <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                    {t("desc2")}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden min-w-[120px]">
                    <div className="h-full w-2/3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400" />
                  </div>
                  <span className="text-xs text-white/55">{t("mini")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-5 text-center shadow-[0_0_30px_rgba(0,0,0,0.22)] hover:border-white/20 hover:bg-white/[0.06] transition"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/70">
                {stat.label}
              </div>
              <div className="mt-4 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}