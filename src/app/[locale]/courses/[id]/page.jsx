"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { coursesServis } from "@/services/coursesServis";
import { useLocale } from "next-intl";
import {
  FaTag,
  FaUserTie,
  FaLayerGroup,
  FaListUl,
  FaSpinner,
} from "react-icons/fa";

export default function CourseDetails() {
  const params = useParams();

  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const locale = useLocale();
  const isArabic = locale === "ar";

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCourse();
    // eslint-disable-next-line
  }, [id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await coursesServis.getOne(id);
      const data = res?.data ?? res;
      console.log(data);
      
      setCourse(data || null);
    } catch (err) {
      console.error("Failed to load course:", err);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const title = isArabic ? course?.nameAr : course?.nameEn;
  const desc = isArabic ? course?.descriptionAr : course?.descriptionEn;

const convertGoogleDriveUrl = (url) => {
  if (!url) return null;

  // إذا الرابط فيه drive.google.com/file/d/
  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

const imageSrc =
  course?.url && String(course.url).trim() !== ""
    ? convertGoogleDriveUrl(course.url)
    : "/images/default-course.jpg";
  const syllabus = isArabic
    ? course?.syllabusAr || []
    : course?.syllabusEn || [];

  const hasSyllabus =
    Array.isArray(syllabus) && syllabus.length > 0;

  if (loading) {
    return (
      <section className="relative py-24 md:mt-[177px] bg-[#070A16] text-white">
        <BgDecor />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
            <FaSpinner className="animate-spin text-white/80" />
            <span className="text-white/80 font-semibold">
              {isArabic
                ? "جاري تحميل تفاصيل الكورس..."
                : "Loading course details..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="relative py-24 md:mt-[177px] bg-[#070A16] text-white">
        <BgDecor />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
            <h2 className="text-xl font-extrabold text-white">
              {isArabic
                ? "لم يتم العثور على الكورس"
                : "Course not found."}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 md:mt-[177px] bg-[#070A16] text-white overflow-hidden">
      <BgDecor />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Hero */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.4)]">
          <div className="relative w-full h-[340px]">
            <Image
              src={imageSrc}
              alt={title || "Course"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#070A16]/95" />
          </div>

          <div className="p-6 md:p-10 text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white">
              {title}
            </h1>

            <p className="mt-3 text-white/70 max-w-3xl mx-auto">
              {desc}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Chip
                label={isArabic ? "السعر" : "Price"}
                value={`${course?.price ?? 0} $`}
              />
              <Chip
                label={isArabic ? "المدرب" : "Trainer"}
                value={
                  course?.trainer?.nameAr ||
                  course?.trainer?.nameEn ||
                  "—"
                }
              />
              <Chip
                label={isArabic ? "المستوى" : "Level"}
                value={
                  isArabic
                    ? course?.level?.nameAr
                    : course?.level?.nameEn
                }
              />
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <InfoCard
            icon={<FaUserTie />}
            title={isArabic ? "المدرب" : "Trainer"}
            value={
              course?.trainer?.nameAr ||
              course?.trainer?.nameEn ||
              "—"
            }
          />
          <InfoCard
            icon={<FaLayerGroup />}
            title={isArabic ? "المستوى" : "Level"}
            value={
              isArabic
                ? course?.level?.nameAr
                : course?.level?.nameEn
            }
          />
          <InfoCard
            icon={<FaTag />}
            title={isArabic ? "السعر" : "Price"}
            value={`${course?.price ?? 0} $`}
          />
        </div>

        {/* Syllabus */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-white text-center mb-6">
            {isArabic ? "منهاج الدورة" : "Course Syllabus"}
          </h2>

          {hasSyllabus ? (
            <div className="space-y-3">
              {syllabus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.04] grid place-items-center">
                    {index + 1}
                  </div>
                  <div className="text-white">{item}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-center">
              {isArabic
                ? "لا يوجد منهاج متاح حالياً"
                : "No syllabus available."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function BgDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
    </>
  );
}

function Chip({ label, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white/80">
      <span className="text-white/55">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.04] grid place-items-center">
          {icon}
        </div>
        <div>
          <div className="text-xs font-bold text-white/60">{title}</div>
          <div className="mt-1 font-extrabold text-white">
            {value || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}