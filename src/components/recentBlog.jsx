import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaUser } from "react-icons/fa";
import { articleServis } from "@/services/articleServis";

export default async function RecentBlog() {
  const locale = await getLocale();
  const t = await getTranslations("Blog");

  let posts = [];
  try {
    let data = await articleServis.getAll();
    if (Array.isArray(data) && data.length > 0) {
      posts = data.slice(-3).reverse();
    }
  } catch (error) {
    console.error("❌ Failed to load articles:", error);
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl text-gray-600">{t("noArticles")}</h2>
      </section>
    );
  }

  return (
    <section
      className="py-16 bg-gray-50"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* بطاقات المقالات */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              {/* التاريخ فقط (لأنه لا يوجد صورة) */}
              {post.createdAt && (
                <div
                  className={`bg-purple-600 text-white px-4 py-3 text-center ${
                    locale === "ar" ? "rounded-l-xl ml-auto w-max" : "rounded-r-xl mr-auto w-max"
                  }`}
                >
                  <div className="text-lg font-bold">
                    {new Date(post.createdAt).getDate()}
                  </div>
                  <div className="text-xs uppercase">
                    {new Date(post.createdAt).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs">
                    {new Date(post.createdAt).getFullYear()}
                  </div>
                </div>
              )}

              {/* المحتوى */}
              <div className="p-6">

                {/* العنوان */}
                <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                  {locale === "ar" ? post.nameAr : post.nameEn}
                </h3>

                {/* الوصف */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {locale === "ar" ? post.descriptionAr : post.descriptionEn}
                </p>

                {/* زر اقرأ المزيد */}
                <Link
                  href={`/${locale}/blog/${post.id}`}
                  className="inline-block bg-[var(--main-color)] hover:bg-[var(--secondary-color-2)] text-white text-sm font-medium py-2 px-5 rounded-full transition"
                >
                  {t("readMore")}
                </Link>

                {/* المدرب */}
                <div
                  className={`flex items-center gap-2 text-sm text-gray-500 mt-4 ${
                    locale === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <FaUser className="text-[var(--main-color)]" />
                  <span>
                    {locale === "ar"
                      ? post.trainer.nameAr
                      : post.trainer.nameEn}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* زر عرض الكل */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/blog`}
            className="bg-[var(--main-color)] hover:bg-[var(--secondary-color-2)] text-white font-medium py-3 px-8 rounded-full transition text-sm md:text-base"
          >
            {t("viewAll")}
          </Link>
        </div>

      </div>
    </section>
  );
}
