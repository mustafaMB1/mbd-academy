"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { trainersSrvis } from "@/services/trainersServis";
import Image from "next/image";
import { useLocale } from "next-intl";
import { FaUser, FaBookOpen, FaStar } from "react-icons/fa";

export default function TrainerDetails() {
  const { id } = useParams();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchTrainer();
  }, [id]);

  const fetchTrainer = async () => {
    try {
      const data = await trainersSrvis.getOne(id);
      setTrainer(data);
    } catch (err) {
      console.error("❌ Failed to load trainer details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl text-gray-500">
          {isArabic ? "جاري تحميل تفاصيل المدرب..." : "Loading trainer details..."}
        </h2>
      </section>
    );
  }

  if (!trainer) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl text-gray-500">
          {isArabic ? "لم يتم العثور على المدرب" : "Trainer not found."}
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[var(--main-color)]/10 to-white py-16 md:mt-[177px]">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* صورة المدرب */}
        <div className="flex flex-col items-center bg-[var(--main-color)] text-white py-10 px-6 relative">
          <div className="relative w-40 h-40 mb-4">
            <Image
              src={trainer.imageUrl && trainer.imageUrl.trim() !== "" ? trainer.imageUrl : "/images/default-trainer.png"}
              alt={isArabic ? trainer.nameAr : trainer.nameEn}
              fill
              className="object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isArabic ? trainer.nameAr : trainer.nameEn}
          </h1>
          <p className="text-sm opacity-90">
            {isArabic ? "مدرب متخصص" : "Professional Trainer"}
          </p>
        </div>

        {/* التفاصيل */}
        <div className="p-10 space-y-8">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--main-color)] mb-3">
              <FaUser /> {isArabic ? "نبذة عن المدرب" : "About the Trainer"}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {isArabic ? trainer.bioAr : trainer.bioEn}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--main-color)] mb-3">
              <FaBookOpen /> {isArabic ? "التخصص" : "Speciality"}
            </h2>
            <p className="text-gray-700">
              {isArabic
                ? trainer.speciality?.nameAr || "غير محدد"
                : trainer.speciality?.nameEn || "Not specified"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {isArabic ? "عدد الدورات المقدمة" : "Courses Provided"}
            </h3>
            <p className="text-[var(--main-color)] text-3xl font-bold flex items-center justify-center gap-2">
              <FaStar /> {trainer.courses?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
