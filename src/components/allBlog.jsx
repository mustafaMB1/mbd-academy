import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaUser, FaComments, FaBookOpen } from "react-icons/fa";
import { articleServis } from "@/services/articleServis";

export default async function AllBlog() {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("Blog");

  let posts = [];
  try {
    posts = await articleServis.getAll();
  } catch (error) {
    console.error("❌ Failed to load articles:", error);
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 md:mt-[177px] bg-gray-50 text-center">
        <h2 className="text-2xl text-gray-600">{t("noArticles")}</h2>
      </section>
    );
  }

  return (
    <section className="py-16 md:mt-[177px] bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {isArabic ? "المقالات" : "Articles"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* بطاقات المقالات */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6"
            >
              {/* أيقونة بدل الصورة */}
              <div className="w-full flex justify-center">
                <div className="bg-purple-100 p-6 rounded-full shadow-inner">
                  <FaBookOpen className="text-purple-600" size={40} />
                </div>
              </div>

              {/* التاريخ */}
              {post.createdAt && (
                <div className="text-center mt-4 mb-2 text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}

              {/* المحتوى */}
              <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900 line-clamp-2 text-center">
                {isArabic ? post.nameAr : post.nameEn}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-center">
                {isArabic ? post.descriptionAr : post.descriptionEn}
              </p>

              {/* زر قراءة المزيد */}
              <div className="text-center">
                <Link
                  href={`/${locale}/blog/${post.id}`}
                  className="inline-block bg-[var(--main-color)] hover:bg-[var(--secondary-color-2)] text-white text-sm font-medium py-2 px-5 rounded-full transition"
                >
                  {t("readMore")}
                </Link>
              </div>

              {/* المدرب */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                <FaUser className="text-[var(--main-color)]" />
                <span>
                  {isArabic
                    ? post.trainer?.nameAr
                    : post.trainer?.nameEn}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
