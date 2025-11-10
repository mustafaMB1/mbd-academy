"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { coursesServis } from "@/services/coursesServis";
import { useLocale } from "next-intl";
import { FaTag, FaUserTie, FaLayerGroup, FaListUl } from "react-icons/fa";

export default function CourseDetails() {
  const { id } = useParams(); // الحصول على معرف الكورس من الرابط
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const data = await coursesServis.getOne(id);
      setCourse(data);
    } catch (err) {
      console.error("❌ Failed to load course details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl  text-gray-500">
          {isArabic ? "جاري تحميل تفاصيل الكورس..." : "Loading course details..."}
        </h2>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl text-gray-500">
          {isArabic ? "لم يتم العثور على الكورس" : "Course not found."}
        </h2>
      </section>
    );
  }

  return (
    <section className="py-16 md:mt-[177px] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* الصورة + العنوان */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden mb-10">
          <div className="relative w-full h-80">
            <Image
              src={course.url && course.url.trim() !== "" ? course.url : "/images/default-course.jpg"}
              alt={isArabic ? course.nameAr : course.nameEn}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-[var(--main-color)] mb-4">
              {isArabic ? course.nameAr : course.nameEn}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {isArabic ? course.descriptionAr : course.descriptionEn}
            </p>
          </div>
        </div>

        {/* معلومات عامة */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="flex items-center gap-3 bg-white shadow rounded-xl p-5">
            <FaUserTie className="text-[var(--main-color)] text-2xl" />
            <div>
              <h3 className="font-semibold">{isArabic ? "المدرب" : "Trainer"}</h3>
              <p className="text-sm">{course.trainer?.nameAr || course.trainer?.nameEn || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white shadow rounded-xl p-5">
            <FaLayerGroup className="text-[var(--main-color)] text-2xl" />
            <div>
              <h3 className="font-semibold">{isArabic ? "المستوى" : "Level"}</h3>
              <p className="text-sm">{isArabic ? course.level?.nameAr : course.level?.nameEn}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white shadow rounded-xl p-5">
            <FaTag className="text-[var(--main-color)] text-2xl" />
            <div>
              <h3 className="font-semibold">{isArabic ? "السعر" : "Price"}</h3>
              <p className="text-sm">{course.price} $</p>
            </div>
          </div>
        </div>

        {/* المنهاج الدراسي */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[var(--main-color)] mb-6 text-center">
            {isArabic ? "منهاج الدورة" : "Course Syllabus"}
          </h2>

          <ul className="space-y-3">
            {(isArabic ? course.syllabusAr : course.syllabusEn)?.length > 0 ? (
              (isArabic ? course.syllabusAr : course.syllabusEn).map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaListUl className="text-[var(--main-color)]" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                {isArabic ? "لا يوجد منهاج متاح حالياً" : "No syllabus available."}
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
