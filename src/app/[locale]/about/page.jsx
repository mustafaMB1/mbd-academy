"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import aboutImage from "../../../assest/logo.jpg";
import { FaBookOpen, FaGlobe, FaUsers } from "react-icons/fa";
import { MdInstallMobile } from "react-icons/md";

export default function AboutPage() {
  const t = useTranslations("About");
  const locale = useLocale();
  const isAr = locale === "ar";

  const services = [
    {
      id: 1,
      icon: <FaBookOpen className="text-3xl text-white" />,
      title: t("services.education.title"),
      desc: t("services.education.desc"),
    },
    {
      id: 2,
      icon: <MdInstallMobile className="text-3xl text-white" />,
      title: t("services.training.title"),
      desc: t("services.training.desc"),
    },
    {
      id: 3,
      icon: <FaUsers className="text-3xl text-white" />,
      title: t("services.community.title"),
      desc: t("services.community.desc"),
    },
    {
      id: 4,
      icon: <FaGlobe className="text-3xl text-white" />,
      title: t("services.global.title"),
      desc: t("services.global.desc"),
    },
  ];

  return (
    <section
      className="relative mt-[156px] overflow-hidden bg-[#070A16] text-white"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background: dots + glow blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/30 via-purple-600/20 to-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/12 to-fuchsia-600/18 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-16">
        {/* Top mini-hero */}
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
          <div className="relative grid gap-8 p-7 md:p-10 md:grid-cols-12 items-center">
            {/* Text */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
                {isAr ? "عن الأكاديمية" : "About the Academy"}
              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-white">
                {t("title")}
              </h1>

              <p className="mt-4 text-white/75 leading-relaxed">
                {t("description1")}
              </p>

              <p className="mt-3 text-white/70 leading-relaxed">
                {t("description2")}
              </p>
            </div>

            {/* Image */}
            <div className="md:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
                <div className="relative h-56 md:h-64 w-full">
                  <Image
                    src={aboutImage}
                    alt="About"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A16]/75 via-black/20 to-transparent" />
                </div>

                {/* small label on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 px-4 py-3 text-sm text-white/85">
                    {isAr
                      ? "نصنع تجربة تعليمية عملية... مش مجرد محتوى"
                      : "We build practical learning experiences—not just content."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services section */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {t("services.title")}
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-white/70">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)] hover:bg-white/[0.06] transition"
            >
              {/* glow */}
              <div className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--main-color)]/15 to-transparent blur-2xl" />
              </div>

              {/* icon bubble */}
              <div className="relative flex items-center justify-center">
                <div className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-white/10 bg-gradient-to-br from-fuchsia-500/45 via-purple-500/30 to-cyan-400/30 shadow-[0_0_28px_rgba(217,70,239,0.18)]">
                  {srv.icon}
                </div>
              </div>

              <h3 className="relative mt-5 text-lg font-extrabold text-white">
                {srv.title}
              </h3>

              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                {srv.desc}
              </p>

              {/* small index tag */}
              <div
                className={[
                  "relative mt-5 inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10",
                  isAr ? "ml-auto" : "mr-auto",
                ].join(" ")}
              >
                {isAr ? "ميزة" : "Feature"} #{String(idx + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070A16] to-transparent" />
      </div>
    </section>
  );
}