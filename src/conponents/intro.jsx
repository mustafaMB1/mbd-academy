"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import mbdImage from "../assest/logo.jpg";

export default function Intro() {
  const t = useTranslations("Intro");

  const stats = [
    { number: 7, label: t("teachers") },
    { number: 185, label: t("students") },
    { number: 13, label: t("courses") },
    { number: 12, label: t("awards") },
  ];

  return (
    <section className="relative text-white py-20 overflow-hidden">
      {/* خلفية مع تظليل محترف */}
      <div className="absolute inset-0">
        <Image
          src={mbdImage}
          alt="Background"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* الفيديو */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/HrwusO-MvWM?rel=0&autoplay=0&mute=1"
            title="Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* النص */}
        <div className="space-y-6">
          <h2 className="text-3xl text-center lg:text-4xl font-extrabold text-white drop-shadow-lg">
            {t("title")}
          </h2>

          <div className="bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-gray-100 leading-relaxed text-lg font-medium">
              {t("desc1")}
            </p>
            <p className="mt-2 text-gray-100 leading-relaxed text-lg font-medium">
              {t("desc2")}
            </p>
          </div>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="relative z-10 mt-20 flex flex-wrap justify-center gap-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg border border-white/10"
          >
            <h3 className="text-4xl font-extrabold text-[var(--secondary-color-1)] drop-shadow-xl">
              {stat.number}
            </h3>
            <p className="text-gray-200 mt-1 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
