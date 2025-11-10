// import { coursesServis } from "@/services/coursesServis";
// import { getLocale, getTranslations } from "next-intl/server";
// import CoursesSlider from "@/conponents/slider";

import CoursesPage from "@/conponents/courses";

export default function Courses() {
  // const locale = await getLocale();
  // const isArabic = locale === "ar";
  // const t = await getTranslations("Courses");

  // let courses = [];
  // try {
  //   courses = await coursesServis.getAll();
  // } catch (error) {
  //   console.error("❌ Failed to load courses:", error);
  // }

  // if (!courses || courses.length === 0) {
  //   return (
  //     <section className="py-20 md:mt-[166px] text-center">
  //       <h2 className="text-2xl text-gray-600">
  //         {isArabic ? "لا يوجد كورسات بعد" : "No courses found."}
  //       </h2>
  //     </section>
  //   );
  // }

  return (
    <section className="py-20 md:mt-[166px] bg-gray-50 text-center">
      {/* <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          {t("title")}
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <CoursesSlider courses={courses} />
      </div> */}
      <CoursesPage/>
    </section>
  );
}
