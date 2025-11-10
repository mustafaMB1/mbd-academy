"use client";

import { FaChalkboardTeacher, FaUserGraduate, FaBook, FaMedal } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
 
export default function FeaturesSection() {
  const t = useTranslations("features");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const icons = [FaChalkboardTeacher, FaUserGraduate, FaBook, FaMedal];

  return (
    <section dir={isArabic ? "rtl" : "ltr"} className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => {
          const Icon = icons[index];
          const isOrange = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center p-10 transition duration-300 
              ${isOrange ? "bg-[var(--secondary-color-1)] text-white" : "bg-[var(--main-color)] text-white"}`}
            >
              <Icon size={50} className="mb-5" />
              <h3 className="text-xl font-semibold mb-3">
                {t(`cards.${index}.title`)}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs">
                {t(`cards.${index}.desc`)}
              </p>
            </div>
          );
        })}
      </div> 
    </section>
  );
}
