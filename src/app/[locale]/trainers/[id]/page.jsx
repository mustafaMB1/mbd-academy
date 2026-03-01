"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { trainersSrvis } from "@/services/trainersServis";
import Image from "next/image";
import { useLocale } from "next-intl";
import { FaUser, FaBookOpen, FaStar, FaSpinner } from "react-icons/fa";
import { MdFolderSpecial } from "react-icons/md";
import { baseUrl } from "@/baseUrl";

function resolveImageUrl(url) {
  const u = (url || "").trim();
  if (!u) return "/images/default-trainer.png";

  // ✅ إذا الباك بيرجع /uploads/....
  if (u.startsWith("/uploads/")) return `${baseUrl}${u}`;

  // ✅ إذا رابط مطلق https
  if (u.startsWith("http://") || u.startsWith("https://")) return u;

  // ✅ أي شيء ثاني خليه fallback
  return "/images/default-trainer.png";
}

export default function TrainerDetails() {
  const params = useParams();
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const locale = useLocale();
  const isArabic = locale === "ar";

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ fallback لو الصورة فشلت
  const [imgSrc, setImgSrc] = useState("/images/default-trainer.png");

  useEffect(() => {
    if (id) fetchTrainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTrainer = async () => {
    setLoading(true);
    try {
      const res = await trainersSrvis.getOne(id);
      const data = res?.data ?? res;

      setTrainer(data || null);

      // ✅ حط الصورة بعد التطبيع
      setImgSrc(resolveImageUrl(data?.imageUrl));
    } catch (err) {
      console.error("❌ Failed to load trainer details:", err);
      setTrainer(null);
      setImgSrc("/images/default-trainer.png");
    } finally {
      setLoading(false);
    }
  };

  const name = isArabic ? trainer?.nameAr : trainer?.nameEn;
  const bio = isArabic ? trainer?.bioAr : trainer?.bioEn;

  const specialityName = trainer?.speciality
    ? isArabic
      ? trainer.speciality?.nameAr
      : trainer.speciality?.nameEn
    : null;

  if (loading) {
    return (
      <section className="relative py-24 mt-[156px] bg-[#070A16] text-white overflow-hidden">
        <BgDecor />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
            <FaSpinner className="animate-spin text-white/80" />
            <span className="text-white/80 font-semibold">
              {isArabic ? "جاري تحميل تفاصيل المدرب..." : "Loading trainer details..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (!trainer) {
    return (
      <section className="relative py-24 mt-[156px] bg-[#070A16] text-white overflow-hidden">
        <BgDecor />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
            <h2 className="text-xl font-extrabold text-white">
              {isArabic ? "لم يتم العثور على المدرب" : "Trainer not found."}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14  mt-[156px] bg-[#070A16] text-white overflow-hidden">
      <BgDecor />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.4)]">
          <div className="relative h-[260px] sm:h-[320px]">
            <Image
              src={imgSrc}
              alt={name || "Trainer"}
              fill
              className="object-cover"
              priority
              onError={() => setImgSrc("/images/default-trainer.png")}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-[#070A16]/95" />

            {/* Avatar */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden ring-4 ring-white/20 border border-white/10 shadow-[0_0_35px_rgba(0,0,0,0.35)]">
                <Image
                  src={imgSrc}
                  alt={name || "Trainer"}
                  fill
                  className="object-cover"
                  onError={() => setImgSrc("/images/default-trainer.png")}
                />
              </div>
            </div>

            {specialityName ? (
              <div
                className={`absolute top-5 ${isArabic ? "right-5" : "left-5"} inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-bold text-white backdrop-blur`}
              >
                <MdFolderSpecial className="text-[var(--main-color)] text-base" />
                <span className="line-clamp-1">{specialityName}</span>
              </div>
            ) : null}
          </div>

          <div className="pt-16 pb-8 px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {name || (isArabic ? "مدرب" : "Trainer")}
            </h1>
            <p className="mt-2 text-sm text-white/65">
              {isArabic ? "مدرب متخصص" : "Professional Trainer"}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Chip label={isArabic ? "الدورات" : "Courses"} value={`${trainer?.courses?.length || 0}`} icon={<FaStar />} />
              <Chip label={isArabic ? "الحالة" : "Status"} value={trainer?.active ? (isArabic ? "نشط" : "Active") : (isArabic ? "غير نشط" : "Inactive")} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <DarkCard icon={<FaUser />} title={isArabic ? "نبذة عن المدرب" : "About the Trainer"}>
            <p className="text-white/75 leading-relaxed">{bio || "—"}</p>
          </DarkCard>

          <DarkCard icon={<FaBookOpen />} title={isArabic ? "التخصص" : "Speciality"}>
            <p className="text-white/75">
              {specialityName || (isArabic ? "غير محدد" : "Not specified")}
            </p>
          </DarkCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function BgDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
    </>
  );
}

function Chip({ label, value, icon }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white/80">
      {icon ? <span className="text-[var(--main-color)]">{icon}</span> : null}
      <span className="text-white/55">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function DarkCard({ icon, title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.04] grid place-items-center text-white">
          {icon}
        </div>
        <div className="text-lg font-extrabold text-white">{title}</div>
      </div>
      {children}
    </div>
  );
}