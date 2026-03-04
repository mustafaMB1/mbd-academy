"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { articleServis } from "@/services/articleServis";
import { useLocale } from "next-intl";
import { FaFeatherAlt, FaUser, FaFolderOpen, FaSpinner } from "react-icons/fa";

export default function ArticleDetails() {
  const params = useParams();

  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const locale = useLocale();
  const isArabic = locale === "ar";

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchArticle();
    // eslint-disable-next-line
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const res = await articleServis.getOne(id);
      const data = res?.data ?? res;
      console.log(data);
      
      setArticle(data || null);
    } catch (err) {
      console.error("❌ Failed to load article details:", err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative py-24 mt-[157px] bg-[#070A16] text-white overflow-hidden">
        <BgDecor />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
            <FaSpinner className="animate-spin text-white/80" />
            <span className="text-white/80 font-semibold">
              {isArabic ? "جاري تحميل المقال..." : "Loading article..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="relative py-24 mt-[157px] bg-[#070A16] text-white overflow-hidden">
        <BgDecor />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
            <h2 className="text-xl font-extrabold text-white">
              {isArabic ? "لم يتم العثور على المقال" : "Article not found."}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  const title = isArabic ? article.nameAr : article.nameEn;
  const description = isArabic
    ? article.descriptionAr
    : article.descriptionEn;

  const content = isArabic
    ? article.contentAr
    : article.contentEn;

  const trainerName = isArabic
    ? article.trainer?.nameAr
    : article.trainer?.nameEn;

  const categoryName = isArabic
    ? article.category?.nameAr
    : article.category?.nameEn;

  return (
    <section
      className="relative py-16 mt-[157px] bg-[#070A16] text-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <BgDecor />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.4)] overflow-hidden">

          {/* Header */}
          <div className="px-8 py-10 text-center border-b border-white/10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1 text-xs font-bold text-white/80 ring-1 ring-white/10 mb-4">
              <FaFeatherAlt className="text-[var(--main-color)]" />
              {article.published
                ? isArabic
                  ? "منشور"
                  : "Published"
                : isArabic
                ? "غير منشور"
                : "Unpublished"}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-relaxed">
              {title}
            </h1>

            {description && (
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap justify-center gap-4 px-8 py-6 border-b border-white/10">
            <Chip
              icon={<FaUser />}
              value={
                trainerName ||
                (isArabic ? "مدرب غير محدد" : "Trainer not specified")
              }
            />

            <Chip
              icon={<FaFolderOpen />}
              value={
                categoryName ||
                (isArabic ? "فئة غير محددة" : "Category not specified")
              }
            />
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <div
              className="prose prose-invert max-w-none prose-p:text-white/80 prose-headings:text-white prose-a:text-[var(--main-color)]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function BgDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
    </>
  );
}

function Chip({ icon, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/80">
      <span className="text-[var(--main-color)]">{icon}</span>
      <span className="line-clamp-1">{value}</span>
    </div>
  );
}