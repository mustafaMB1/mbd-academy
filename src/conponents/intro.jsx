"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import mbdImage from "../assest/logo.jpg";

export default function Intro() {
  const t = useTranslations("Intro");

  const stats = [
    { number: 18, label: t("teachers") },
    { number: 401, label: t("students") },
    { number: 30, label: t("courses") },
    { number: 50, label: t("awards") },
  ];

  return (
    <section className="relative bg-gradient-to-r from-gray-900/80 to-black text-white py-20 overflow-hidden">
      {/* الخلفية */}
      <div className="absolute inset-0">
        <Image
          src={mbdImage}
          alt="University Background"
          fill
          className="object-cover opacity-70"
        />
      </div>

      {/* المحتوى */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* الفيديو YouTube */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/HrwusO-MvWM?rel=0&autoplay=0&mute=1"
            title="The distinction that gets you into the job market starts with our courses."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* النص */}
        <div className="space-y-5 text-center lg:text-left">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <div className="bg-[var(--secondary-color-2)] p-3 rounded-2xl text-center lg:text-left">
            <p className="text-white leading-relaxed font-bold">{t("desc1")}</p>
            <p className="text-white leading-relaxed font-bold">{t("desc2")}</p>
          </div>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-10">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-4xl font-bold">{stat.number}</h3>
            <p className="text-gray-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
