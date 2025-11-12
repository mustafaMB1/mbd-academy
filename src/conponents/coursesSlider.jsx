"use client";

import Slider from "react-slick";
import Image from "next/image";
import courseImage from "../assest/download.jpeg";
import { useLocale } from "next-intl";
import { FaArrowLeft, FaArrowRight, FaUser, FaTag, FaGraduationCap } from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderData({ data }) {
  const locale = useLocale();

  const settings = {
    dots: true,
    infinite: data.length > 1, // 🔹 إذا عنصر واحد فقط لا تكرر اللوب بلا نهاية
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: Math.min(3, data.length), // 🔹 لو أقل من 3 عناصر، يظهر عددها بالضبط
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, data.length),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const courses = data.filter((course) => course.published === true);

  if (courses.length === 0)
    return (
      <p className="text-center text-gray-600 py-10">
        {locale === "ar" ? "لا يوجد كورسات متاحة حاليًا" : "No available courses"}
      </p>
    );

  return (
    <Slider {...settings}>
      {courses.map((course) => (
        <div key={course.id} className="p-4">
          <Link
            href={`/${locale}/courses/${course.id}`}
            className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
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
                      {locale === "ar" ? course.category.nameAr : course.category.nameEn}
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

                {/* المدرّب */}
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
    </Slider>
  );
}

function SampleNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 right-4 top-1/2 -translate-y-1/2 bg-[var(--main-color)] text-white p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowRight />
    </button>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 left-4 top-1/2 -translate-y-1/2 bg-[var(--main-color)] text-white p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowLeft />
    </button>
  );
}
