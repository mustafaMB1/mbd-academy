"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  FaTag,
  FaLayerGroup,
  FaUserTie,
  FaMoneyBillWave,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function CoursesGrid({ courses = [] }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("CoursesAvailable");

  // ✅ safety: إذا وصل object بالغلط، حوّله لمصفوفة
  const list = Array.isArray(courses) ? courses : courses ? [courses] : [];

  const getName = (c) => (isArabic ? c?.nameAr : c?.nameEn) || "";
  const getDesc = (c) => (isArabic ? c?.descriptionAr : c?.descriptionEn) || "";
  const getCategory = (c) =>
    (isArabic ? c?.category?.nameAr : c?.category?.nameEn) || t("unknown");
  const getLevel = (c) =>
    (isArabic ? c?.level?.nameAr : c?.level?.nameEn) || t("unknown");
  const getTrainer = (c) =>
    (isArabic ? c?.trainer?.nameAr : c?.trainer?.nameEn) || t("unknown");
  const getSyllabus = (c) => (isArabic ? c?.syllabusAr : c?.syllabusEn) || [];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {list.map((course) => {
        const title = getName(course);
        const desc = getDesc(course);
        const category = getCategory(course);
        const level = getLevel(course);
        const trainer = getTrainer(course);
        const price = course?.price ?? 0;
        const syllabus = getSyllabus(course);

        return (
          <div
            key={course?.id || Math.random()}
            className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] hover:border-white/20 transition"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/16 via-purple-500/10 to-cyan-400/14 opacity-90" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A16]/50 via-transparent to-transparent" />

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-white line-clamp-1">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {desc}
                  </p>
                </div>

                <span className="shrink-0 inline-flex items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 px-3 py-2 text-xs text-white/85">
                  <FaMoneyBillWave className={isArabic ? "ml-2" : "mr-2"} />
                  {t("price", { value: price })}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
                  <FaTag className={isArabic ? "ml-2" : "mr-2"} />
                  {t("category")}: {category}
                </span>

                <span className="inline-flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
                  <FaLayerGroup className={isArabic ? "ml-2" : "mr-2"} />
                  {t("level")}: {level}
                </span>

                <span className="inline-flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
                  <FaUserTie className={isArabic ? "ml-2" : "mr-2"} />
                  {t("trainer")}: {trainer}
                </span>
              </div>

              {Array.isArray(syllabus) && syllabus.length > 0 && (
                <div className="mt-4 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
                  <div className="text-xs font-semibold text-white/80">
                    {t("syllabus")}
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    {syllabus.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                        <span className="line-clamp-1">{s}</span>
                      </li>
                    ))}
                    {syllabus.length > 3 && (
                      <li className="text-xs text-white/55">
                        {t("more", { count: syllabus.length - 3 })}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href={`/${locale}/courses/${course.id}`}
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white
                    bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/20 transition"
                >
                  {t("details")}
                  {isArabic ? (
                    <FaArrowLeft className="mr-2" />
                  ) : (
                    <FaArrowRight className="ml-2" />
                  )}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white
                    bg-gradient-to-r from-fuchsia-500/90 via-purple-500/90 to-cyan-400/80
                    shadow-[0_0_30px_rgba(217,70,239,0.18)]
                    hover:shadow-[0_0_45px_rgba(34,211,238,0.18)] transition"
                >
                  {t("enroll")}
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[0_0_60px_rgba(34,211,238,0.06)]" />
          </div>
        );
      })}
    </div>
  );
}