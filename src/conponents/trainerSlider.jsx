"use client";

import Slider from "react-slick";
import Image from "next/image";
import trainerImage from '../assest/download.jpeg'
import { useLocale } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdFolderSpecial } from "react-icons/md";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
export default function SliderData({ data }) {
  const locale = useLocale();




  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((trainer) => (
        trainer.active === true ? (    <div className="p-4">
        <Link href={`/${locale}/trainers/${trainer.id}`} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
          {/* صورة الدورة */}
          <div className="relative w-full h-56">
          <Image
  src={
    trainer.imageUrl && trainer.imageUrl.trim() !== ""
      ? trainer.imageUrl
      : trainerImage
  }
  alt={locale === "ar" ? trainer.nameAr : trainer.nameEn}
  fill
  className="object-cover"
/>

          </div>
  
          {/* تفاصيل الدورة */}
          <div className="p-6 text-left">
            <h3 className="text-2xl font-bold text-[var(--main-color)] mb-2">
              {locale === 'ar' ? trainer.nameAr : trainer.nameEn}
            </h3>
  
            <p className="text-gray-600 mb-4 line-clamp-3">{locale === 'ar' ? trainer.bioAr : trainer.bioEn}</p>
  
            <div className="flex flex-col gap-2 text-[var(--secondary-color-1)] font-medium text-sm">
              {!trainer.speciality ? '' : (              <div className="flex items-center gap-2">
                <MdFolderSpecial className="text-[var(--main-color)]" />
                <span>{locale === 'ar' ? trainer.speciality.nameAr : trainer.speciality.nameEn}</span>
              </div>
  ) }

  
  

            </div>
          </div>
        </Link>
      </div>) : ""
      ))}
    </Slider>
  );
}

function SampleNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 right-4 top-1/2 transform -translate-y-1/2 bg-[var(--main-color)] text-white p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowRight />
    </button>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute z-40 left-4 top-1/2 transform -translate-y-1/2 bg-[var(--main-color)] text-white p-3 rounded-full shadow-md hover:bg-[var(--secondary-color-1)] transition"
    >
      <FaArrowLeft />
    </button>
  );
}
