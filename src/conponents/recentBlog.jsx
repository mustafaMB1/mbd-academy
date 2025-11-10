import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { FaUser, FaComments } from "react-icons/fa";
import { articleServis } from "@/services/articleServis";
// import { useLocale } from "next-intl";
export default async function RecentBlog() {
  const locale = await getLocale();
  const t = await getTranslations("Blog");
  // const t = useTranslations("Blog");
  // const [posts, setPosts] = useState([]);

  // useEffect(() => { 
  //   const fetchArticles = async () => {
  //     try {
  //       const data = await articleServis.getAll();

  //       if (Array.isArray(data) && data.length > 0) {
  //         // عرض آخر 3 مقالات فقط
  //         const lastThree = data.slice(-3).reverse();
  //         setPosts(lastThree);
  //       }
  //     } catch (error) {
  //       console.error("❌ Failed to load articles:", error);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  let posts = []
  try {
    let data = await articleServis.getAll();
            if (Array.isArray(data) && data.length > 0) {
          // عرض آخر 3 مقالات فقط
          const lastThree = data.slice(-3).reverse();
          posts = lastThree
        }
  } catch (error) {
    console.error("❌ Failed to load trainers:", error);
  }


  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl text-gray-600">{t("noArticles")}</h2>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* بطاقات المقالات */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              {/* الصورة */}
              <div className="relative w-full h-56">
                <Image
                  src={
                    post.imageUrl && post.imageUrl.trim() !== ""
                      ? post.imageUrl
                      : "/images/blog-default.jpg"
                  }
                  alt={post.title || "Article"}
                  fill
                  className="object-cover"
                />

                {/* التاريخ */}
                {post.createdAt && (
                  <div className="absolute top-0 left-0 bg-purple-600 text-white px-4 py-2 text-center">
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
              </div>

              {/* المحتوى */}
              <div className="p-6 text-start">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                {locale === 'ar' ? post.nameAr : post.nameEn}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {locale === 'ar' ? post.descriptionAr : post.descriptionEn}
                </p>

                <Link
                  href={`/${locale}/blog/${post.id}`}
                  className="inline-block bg-[var(--main-color)] hover:bg-[var(--secondary-color-2)] text-white text-sm font-medium py-2 px-5 rounded-full transition"
                >
                  {t("readMore")}
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-[var(--main-color)]" />{" "}
                    {locale === 'ar' ? post.trainer.nameAr : post.trainer.nameEn}
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
