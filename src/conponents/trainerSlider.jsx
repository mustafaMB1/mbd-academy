"use client";

import Slider from "react-slick";
import Image from "next/image";
import trainerImage from "../assest/download.jpeg";
import { useLocale } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdFolderSpecial } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function SliderData({ data }) {
  const locale = useLocale();

  // ✅ معالجة في حال وجود عنصر واحد فقط
  const slidesCount = data?.filter((t) => t.active).length || 0;
  const infiniteScroll = slidesCount > 1;

  const settings = {
    dots: true,
    infinite: infiniteScroll, // ✅ لا يتوقف السلايدر حتى لو عنصر واحد
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: Math.min(slidesCount, 3), // ✅ لا يحجز فراغات فارغة
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(slidesCount, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false, // ✅ في الموبايل نستخدم فقط السحب والدوتس
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="relative w-full px-2 sm:px-4 lg:px-6">
      <Slider {...settings}>
        {data.map(
          (trainer) =>
            trainer.active && (
              <div key={trainer.id} className="p-2 sm:p-4">
                <Link
                  href={`/${locale}/trainers/${trainer.id}`}
                  className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  {/* صورة المدرب */}
                  <div className="relative w-full h-52 sm:h-60 md:h-64">
                    <Image
                      src={
                        trainer.imageUrl && trainer.imageUrl.trim() !== ""
                          ? trainer.imageUrl
                          : trainerImage
                      }
                      alt={
                        locale === "ar" ? trainer.nameAr : trainer.nameEn || "Trainer"
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* تفاصيل المدرب */}
                  <div className="p-4 sm:p-6 text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--main-color)] mb-2 line-clamp-1">
                      {locale === "ar" ? trainer.nameAr : trainer.nameEn}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
                      {locale === "ar" ? trainer.bioAr : trainer.bioEn}
                    </p>

                    {trainer.speciality && (
                      <div className="flex items-center gap-2 text-[var(--secondary-color-1)] font-medium text-sm">
                        <MdFolderSpecial className="text-[var(--main-color)]" />
                        <span>
                          {locale === "ar"
                            ? trainer.speciality.nameAr
                            : trainer.speciality.nameEn}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )
        )}
      </Slider>
    </div>
  );
}

// ====== الأسهم ======
function SampleNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[var(--main-color)] text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowRight />
    </button>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[var(--main-color)] text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowLeft />
    </button>
  );
}
