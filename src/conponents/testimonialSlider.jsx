"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { feedbackSrvis } from "@/services/feedbackServis";
import avatar from "../assest/avatar.png";
import { FaQuoteLeft } from "react-icons/fa";
import { useLocale } from "next-intl";
import CodeLoader from "./codeLoader";

export default function StudentTestimonials({ courseId }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await feedbackSrvis.getAllForCourse(courseId);
        setTestimonials(data || []);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    if (courseId) fetchTestimonials();
  }, [courseId]);

  return (
    <section className="py-20 bg-white text-center relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* العنوان */}
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          {isArabic ? "آراء طلابنا" : "Feedback from our students"}
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          {isArabic
            ? "هذه بعض آراء طلابنا عن الدورة."
            : "Here are some of our students’ feedback about the course."}
        </p>

        {/* قائمة التعليقات */}
        {loading ? (
          <CodeLoader/>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            {isArabic ? "لا توجد تقييمات بعد." : "No feedback yet."}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src={item.user?.image || avatar}
                      alt={item.user?.name || "User"}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>

                  <FaQuoteLeft className="text-3xl text-purple-300 mb-3" />
                  <p className="text-[var(--main-color)] text-xs font-medium">
                    {isArabic ? item.commentAr : item.commentEn}
                  </p>
                  {/* <p className="text-gray-700 text-sm italic mb-3">
                  {isArabic ? item.commentAr : item.commentEn}
                  </p> */}

                  <h3 className="text-lg font-semibold text-[var(--secondary-color-2)]">
                    {item.email || "مستخدم مجهول"}
                  </h3>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
