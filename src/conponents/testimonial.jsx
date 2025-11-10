"use client";

import { use, useEffect, useState } from "react";
import { coursesServis } from "@/services/coursesServis";
import StudentTestimonials from "./testimonialSlider";
import { useLocale } from "next-intl";
export default function CoursesWithFeedback() {
  const local = useLocale()
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // ✅ جلب جميع الكورسات عند التحميل
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesServis.getAll();
        setCourses(data);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب الكورسات:", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* العنوان */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {local === 'ar' ? "اختر كورس لعرض تقييمات الطلاب" : "select course to show feedback students"}
          
        </h2>

        {/* 🔹 قائمة الكورسات */}
        {loadingCourses ? (
          <p className="text-gray-500">{local === 'ar' ? "جارٍ تحميل الكورسات..." : "couses loading..."}</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                  selectedCourse?.id === course.id
                    ? "bg-[var(--main-color)] text-white border-transparent"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {local === 'ar' ? course.nameAr : course.nameEn}
              </button>
            ))}
          </div>
        )}

        {/* 🔹 عرض الفيدباك عبر الكمبونينت الجاهز */}
        {selectedCourse && (
          <div>
            <h3 className="text-2xl font-semibold text-[var(--main-color)] mb-8">
              {local === 'ar' ? "تقييمات الطلاب لكورس:" : "feedback students"} {local === 'ar' ? selectedCourse.nameAe : selectedCourse.nameEn}
            </h3>
            <StudentTestimonials courseId={selectedCourse.id} />
          </div>
        )}
      </div>
    </section>
  );
}
