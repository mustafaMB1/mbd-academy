"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import offerImage from '../assest/offer.jpg'
export default function WhatWeOffer() {
  const t = useTranslations("WhatWeOffer"); 

  const items = [
    { icon: "🛡️", title: t("safetyTitle"), desc: t("safetyDesc") },
    { icon: "📚", title: t("regularTitle"), desc: t("regularDesc") },
    { icon: "🎓", title: t("teachersTitle"), desc: t("teachersDesc") },
    { icon: "🏫", title: t("classroomsTitle"), desc: t("classroomsDesc") },
    { icon: "🎨", title: t("creativeTitle"), desc: t("creativeDesc") },
    { icon: "⚽", title: t("sportsTitle"), desc: t("sportsDesc") },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* النص */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h2>
          <p className="text-gray-600 mb-8">{t("subtitle")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="bg-[var(--secondary-color-1)] text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الصورة */}
        <div className="relative w-full h-[420px]">
          <Image
            src={offerImage} // ضع الصورة هنا
            alt="Students"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
