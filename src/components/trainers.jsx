import { trainersSrvis } from "@/services/trainersServis";
import { getLocale, getTranslations } from "next-intl/server";
import SliderData from "./trainerSlider";
import { baseUrl } from "@/baseUrl";

function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  const s = String(pathOrUrl).trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return `${baseUrl}${s}`;
  return `${baseUrl}/${s}`;
}

function normalizeList(resp) {
  const raw = resp?.data?.data ?? resp?.data ?? resp;
  return Array.isArray(raw) ? raw : [];
}

export default async function Trainers({ isMargin }) {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("Trainers");

  let trainers = [];
  try {
    const resp = await trainersSrvis.getAll();
    const list = normalizeList(resp);

    trainers = list.map((tr) => ({
      ...tr,
      imageUrl: toAbsoluteUrl(tr.imageUrl),
    }));
  } catch (error) {
    console.error("❌ Failed to load trainers:", error);
  }

  if (!trainers || trainers.length === 0) {
    return (
      <section
        className={`py-20 ${isMargin ? "md:mt-[169px]" : ""} bg-[#070A16]`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            {isArabic ? "لا يوجد مدربون بعد" : "No trainers found."}
          </h2>
          <p className="mt-2 text-white/70">
            {isArabic
              ? "أضف مدربين من لوحة الإدارة ليظهروا هنا."
              : "Add trainers from admin panel to show them here."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-20 ${isMargin ? "md:mt-[169px]" : ""} bg-[#070A16]`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header مثل أقسام الموقع */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[var(--main-color)]" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Container خفيف مثل الأقسام */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
          {/* ✅ تمرير بيانات المدربين للـ slider */}
          <SliderData data={trainers} />
        </div>
      </div>
    </section>
  );
}