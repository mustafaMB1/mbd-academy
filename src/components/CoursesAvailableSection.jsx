import { coursesServis } from "@/services/coursesServis";
import { getLocale, getTranslations } from "next-intl/server";
import CoursesGrid from "./CoursesGrid";

function normalizeCourses(res) {
  // حالات شائعة جداً بالباك اند
  if (Array.isArray(res)) return res;

  // axios غالباً: res.data
  if (Array.isArray(res?.data)) return res.data;

  // pagination: res.data.items أو res.data.courses
  if (Array.isArray(res?.data?.items)) return res.data.items;
  if (Array.isArray(res?.data?.courses)) return res.data.courses;

  // مباشرة: res.items أو res.courses
  if (Array.isArray(res?.items)) return res.items;
  if (Array.isArray(res?.courses)) return res.courses;

  // إذا رجع Course واحد (Object) مثل اللي بالصورة
  if (res && typeof res === "object") return [res];

  // fallback
  return [];
}

export default async function CoursesAvailableSection() {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("CoursesAvailable");

  let courses = [];

  try {
    const res = await coursesServis.getAll();
    courses = normalizeCourses(res);
  } catch (error) {
    console.error("❌ Failed to load courses:", error);
    courses = [];
  }

  // فقط المنشور (published === true)
  const publishedCourses = courses.filter((c) => c?.published === true);

  if (!publishedCourses.length) {
    return (
      <section className="py-20 bg-[#070A16]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold text-white">{t("title")}</h2>
          <p className="mt-3 text-white/70">
            {isArabic ? "لا يوجد كورسات متاحة حالياً." : "No available courses right now."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#070A16] py-16 md:py-20">
      {/* dotted */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      {/* blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/22 via-purple-600/16 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/14 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
            {t("badge")}
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-white/70 text-sm md:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10">
          <CoursesGrid courses={publishedCourses} />
        </div>
      </div>
    </section>
  );
}