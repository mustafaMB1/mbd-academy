import { coursesServis } from "@/services/coursesServis";
import { getLocale, getTranslations } from "next-intl/server";
import CoursesGrid from "@/components/CoursesGrid";

export default async function Courses() {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("Courses");

  let courses = [];

  try {
    const res = await coursesServis.getAll();
    courses = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
  } catch (error) {
    console.error("❌ Failed to load courses:", error);
    courses = [];
  }

  if (!courses.length) {
    return (
      <section className="relative overflow-hidden bg-[#070A16] py-20 mt-[156px] text-center text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/22 via-purple-600/16 to-cyan-400/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/14 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10">
            <h2 className="text-2xl font-bold text-white">
              {isArabic ? "لا يوجد كورسات بعد" : "No courses found."}
            </h2>
            <p className="mt-3 text-white/65">
              {isArabic
                ? "سيتم إضافة كورسات جديدة قريباً."
                : "New courses will be available soon."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#070A16] py-20 mt-[156px] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/22 via-purple-600/16 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/14 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
            {t("title")}
          </div>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <CoursesGrid courses={courses} />
      </div>
    </section>
  );
}