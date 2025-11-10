"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { articleServis } from "@/services/articleServis";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaFeatherAlt, FaUser, FaFolderOpen } from "react-icons/fa";

export default function ArticleDetails() {
  const { id } = useParams();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const data = await articleServis.getOne(id);
      setArticle(data);
    } catch (err) {
      console.error("❌ Failed to load article details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl text-gray-500">
          {isArabic ? "جاري تحميل المقال..." : "Loading article..."}
        </h2>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="py-20 md:mt-[177px] text-center">
        <h2 className="text-xl text-gray-500">
          {isArabic ? "لم يتم العثور على المقال" : "Article not found."}
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[var(--main-color)]/5 py-20 md:mt-[177px]">
      <div className="max-w-5xl mx-auto px-6">
        {/* العنوان + الصورة */}
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden mb-10 transition hover:shadow-2xl duration-300">
          <div className="relative w-full h-80">
            <Image
              src={article.imageUrl && article.imageUrl.trim() !== "" ? article.imageUrl : "/images/default-article.jpg"}
              alt={isArabic ? article.nameAr : article.nameEn}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {isArabic ? article.nameAr : article.nameEn}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <p className="text-gray-600 mb-6 text-center text-lg leading-relaxed">
              {isArabic ? article.descriptionAr : article.descriptionEn}
            </p>

            {/* معلومات عامة */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-gray-700">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <FaUser className="text-[var(--main-color)]" />
                <span>
                  {isArabic
                    ? article.trainer?.nameAr || "المدرب غير محدد"
                    : article.trainer?.nameEn || "Trainer not specified"}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <FaFolderOpen className="text-[var(--main-color)]" />
                <span>
                  {isArabic
                    ? article.category?.nameAr || "فئة غير محددة"
                    : article.category?.nameEn || "Category not specified"}
                </span>
              </div>

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  article.published
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <FaFeatherAlt />
                <span>
                  {isArabic
                    ? article.published
                      ? "منشور"
                      : "غير منشور"
                    : article.published
                    ? "Published"
                    : "Unpublished"}
                </span>
              </div>
            </div>

            {/* المحتوى الكامل */}
            <div
              className="prose max-w-none prose-p:leading-relaxed prose-img:rounded-lg prose-h2:text-[var(--main-color)] text-gray-800"
              dangerouslySetInnerHTML={{
                __html: isArabic ? article.contentAr : article.contentEn,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
