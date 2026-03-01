"use client";

import Image from "next/image";
import trainerImage from "../assest/download.jpeg";
import { useLocale } from "next-intl";
import { MdFolderSpecial } from "react-icons/md";
import Link from "next/link";

export default function SliderData({ data }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const list = Array.isArray(data) ? data : [];
  const activeTrainers = list.filter((t) => t?.active);

  if (activeTrainers.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <div className="text-lg font-extrabold text-white">
          {isAr ? "لا يوجد مدربين متاحين" : "No active trainers"}
        </div>
        <div className="mt-2 text-sm text-white/60">
          {isAr
            ? "سيظهر المدربون هنا عندما يتم تفعيلهم من لوحة الإدارة."
            : "Trainers will appear here once enabled from the admin panel."}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${isAr ? "direction-rtl text-right" : "text-left"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTrainers.map((trainer) => {
          const name = isAr ? trainer?.nameAr : trainer?.nameEn;
          const bio = isAr ? trainer?.bioAr : trainer?.bioEn;

          const imgSrc =
            trainer?.imageUrl && String(trainer.imageUrl).trim() !== ""
              ? String(trainer.imageUrl).trim()
              : trainerImage;

          const specName = trainer?.speciality
            ? isAr
              ? trainer.speciality?.nameAr
              : trainer.speciality?.nameEn
            : null;

          return (
            <Link
              key={trainer.id}
              href={`/${locale}/trainers/${trainer.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">
                {/* Image */}
                <div className="relative w-full h-56 sm:h-64">
                  <Image
                    src={imgSrc}
                    alt={name || "Trainer"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />

                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

                  {/* badge top */}
                  {specName ? (
                    <div
                      className={`absolute top-4 ${
                        isAr ? "right-4" : "left-4"
                      } inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur`}
                    >
                      <MdFolderSpecial className="text-[var(--main-color)] text-base" />
                      <span className="line-clamp-1">{specName}</span>
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white line-clamp-1">
                      {name || (isAr ? "مدرب" : "Trainer")}
                    </h3>

                    {/* small accent dot */}
                    <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[var(--main-color)] opacity-80" />
                  </div>

                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed text-white/70 line-clamp-3 ${
                      isAr ? "text-right" : "text-left"
                    }`}
                  >
                    {bio || (isAr ? "—" : "—")}
                  </p>

                  {/* CTA line */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-white/80">
                    <span className="inline-block h-[2px] w-8 rounded-full bg-[var(--main-color)]/70" />
                    <span className="group-hover:text-white transition">
                      {isAr ? "عرض الملف" : "View profile"}
                    </span>
                  </div>
                </div>

                {/* subtle shine on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[var(--main-color)]/10 blur-3xl" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}