import { trainersSrvis } from "@/services/trainersServis";
import { getLocale, getTranslations } from "next-intl/server";
import SliderData from "./trainerSlider";

export default async function Trainers({isMargin}) {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("Trainers");

  let trainers = []; 
  try {
    trainers = await trainersSrvis.getAll();
    console.log(trainers);
  } catch (error) {
    console.error("❌ Failed to load trainers:", error);
  }

  if (!trainers || trainers.length === 0) {
    return (
      <section className="py-20  text-center">
        <h2 className="text-2xl text-gray-600">
          {isArabic ? "لا يوجد مدربون بعد" : "No trainers found."}
        </h2>
      </section>
    );
  }

  return (
    <section className={`py-20 ${isMargin ? "md:mt-[169px]" : ""} bg-gray-50 text-center`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          {t("title")}
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* ✅ تمرير بيانات المدربين إلى المكوّن العميل */}
        <SliderData data={trainers}  />
      </div>
    </section>
  );
}
