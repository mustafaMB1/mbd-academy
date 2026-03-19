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
  FaBookOpen,
} from "react-icons/fa";

export default function CoursesGrid({ courses = [] }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("CoursesAvailable");

  const list = Array.isArray(courses) ? courses : courses ? [courses] : [];

  const getText = (arValue, enValue, fallback = "") =>
    (isArabic ? arValue : enValue) || fallback;

  const getCourseData = (course) => {
    return {
      id: course?.id,
      title: getText(course?.nameAr, course?.nameEn, t("unknown")),
      desc: getText(course?.descriptionAr, course?.descriptionEn, t("unknown")),
      category: getText(
        course?.category?.nameAr,
        course?.category?.nameEn,
        t("unknown")
      ),
      level: getText(
        course?.level?.nameAr,
        course?.level?.nameEn,
        t("unknown")
      ),
      trainer: getText(
        course?.trainer?.nameAr,
        course?.trainer?.nameEn,
        t("unknown")
      ),
      syllabus: isArabic ? course?.syllabusAr || [] : course?.syllabusEn || [],
      price: Number(course?.price || 0),
    };
  };

  if (!list.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
          <FaBookOpen className="text-white/80 text-2xl" />
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-white">
          {t("emptyTitle")}
        </h3>
        <p className="mt-2 text-sm text-white/65">
          {t("emptyDesc")}
        </p>
      </div>
    );
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {list.map((course, index) => {
        const {
          id,
          title,
          desc,
          category,
          level,
          trainer,
          syllabus,
          price,
        } = getCourseData(course);

        return (
          <article
            key={id || `course-${index}`}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] transition duration-300 hover:border-white/20 hover:bg-white/[0.055]"
          >
            {/* Glow background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/14 via-purple-500/8 to-cyan-400/12 opacity-90" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A16]/55 via-transparent to-transparent" />

            {/* Hover glow */}
            <div className="pointer-events-none absolute -inset-20 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--main-color)]/12 to-transparent blur-2xl" />
            </div>

            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-white line-clamp-1">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-3">
                    {desc}
                  </p>
                </div>

                <div className="shrink-0 inline-flex items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 px-3 py-2 text-xs font-semibold text-white/85">
                  <FaMoneyBillWave className={isArabic ? "ml-2" : "mr-2"} />
                  {t("price", { value: price })}
                </div>
              </div>

              {/* Meta pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <MetaBadge
                  icon={<FaTag />}
                  label={`${t("category")}: ${category}`}
                  isArabic={isArabic}
                />
                <MetaBadge
                  icon={<FaLayerGroup />}
                  label={`${t("level")}: ${level}`}
                  isArabic={isArabic}
                />
                <MetaBadge
                  icon={<FaUserTie />}
                  label={`${t("trainer")}: ${trainer}`}
                  isArabic={isArabic}
                />
              </div>

              {/* Syllabus */}
              {Array.isArray(syllabus) && syllabus.length > 0 && (
                <div className="mt-5 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-white/80">
                    {t("syllabus")}
                  </div>

                  <ul className="mt-3 space-y-2">
                    {syllabus.slice(0, 3).map((item, idx) => (
                      <li
                        key={`${id || index}-syllabus-${idx}`}
                        className="flex items-start gap-2 text-sm text-white/72"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}

                    {syllabus.length > 3 && (
                      <li className="text-xs text-white/50">
                        {t("more", { count: syllabus.length - 3 })}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href={`/${locale}/courses/${id}`}
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

            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[0_0_60px_rgba(34,211,238,0.06)]" />
          </article>
        );
      })}
    </div>
  );
}

function MetaBadge({ icon, label, isArabic }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
      <span className={isArabic ? "ml-2" : "mr-2"}>{icon}</span>
      {label}
    </span>
  );
}