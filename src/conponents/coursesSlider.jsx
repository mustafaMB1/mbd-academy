"use client";

import Image from "next/image";
import courseImage from "../assest/download.jpeg";
import { useLocale } from "next-intl";
import { FaUser, FaTag, FaGraduationCap } from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import Link from "next/link";

export default function SliderData({ data }) {
  const locale = useLocale();

  const courses = data.filter((course) => course.published === true);

  if (courses.length === 0)
    return (
      <p className="text-center text-gray-600 py-10">
        {locale === "ar" ? "لا يوجد كورسات متاحة حاليًا" : "No available courses"}
      </p>
    );

  return (
    <div className="w-full px-4">
      {/* Grid Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <Link href={`/${locale}/courses/${course.id}`} className="block">

              {/* صورة الدورة */}
              <div className="relative w-full h-56">
                <Image
                  src={course.url?.trim() ? course.url : courseImage}
                  alt={locale === "ar" ? course.nameAr : course.nameEn}
                  fill
                  className="object-cover"
                />
              </div>

              {/* تفاصيل الدورة */}
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold text-[var(--main-color)] mb-2">
                  {locale === "ar" ? course.nameAr : course.nameEn}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {locale === "ar" ? course.descriptionAr : course.descriptionEn}
                </p>

                <div className="flex flex-col gap-2 text-[var(--secondary-color-1)] font-medium text-sm">

                  {/* الفئة */}
                  {course.category && (
                    <div className="flex items-center gap-2">
                      <FaTag className="text-[var(--main-color)]" />
                      <span>
                        {locale === "ar"
                          ? course.category.nameAr
                          : course.category.nameEn}
                      </span>
                    </div>
                  )}

                  {/* المستوى */}
                  {course.level && (
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="text-[var(--main-color)]" />
                      <span>
                        {locale === "ar" ? course.level.nameAr : course.level.nameEn}
                      </span>
                    </div>
                  )}

                  {/* المدرب */}
                  {course.trainer && (
                    <div className="flex items-center gap-2">
                      <FaUser className="text-[var(--main-color)]" />
                      <span>
                        {locale === "ar" ? course.trainer.nameAr : course.trainer.nameEn}
                      </span>
                    </div>
                  )}

                  {/* السعر */}
                  <div className="flex items-center gap-2">
                    <MdOutlinePriceCheck className="text-[var(--main-color)]" />
                    <span>
                      {locale === "ar" ? "السعر:" : "Price:"} {course.price}{" "}
                      {locale === "ar" ? "دولار" : "USD"}
                    </span>
                  </div>
                </div>
              </div>

            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
