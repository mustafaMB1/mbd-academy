"use client";

import Image from "next/image";
import trainerImage from "../assest/download.jpeg";
import { useLocale } from "next-intl";
import { MdFolderSpecial } from "react-icons/md";
import Link from "next/link";

export default function SliderData({ data }) {
  const locale = useLocale();

  const activeTrainers = data.filter((t) => t.active);

  if (activeTrainers.length === 0)
    return (
      <p className="text-center text-gray-600 py-10">
        {locale === "ar" ? "لا يوجد مدربين متاحين" : "No active trainers"}
      </p>
    );

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      {/* Grid Responsive بدل Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

            <Link href={`/${locale}/trainers/${trainer.id}`} className="block">

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
        ))}
      </div>
    </div>
  );
}
