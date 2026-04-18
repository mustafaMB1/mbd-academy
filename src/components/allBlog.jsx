import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaUser, FaBookOpen } from "react-icons/fa";
import { articleServis } from "@/services/articleServis";

function safeTime(dateInput) {
  if (!dateInput) return 0;
  const t = new Date(dateInput).getTime();
  return Number.isFinite(t) ? t : 0;
}

function formatDateParts(dateInput, locale) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return null;

  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString(locale === "ar" ? "ar" : "en", {
    month: "short",
  });
  const year = String(d.getFullYear());
  return { day, month, year };
}

export default async function AllBlog({ isMargin }) {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const t = await getTranslations("Blog");

  let data = [];
  try {
    const res = await articleServis.getAll();
    data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
  } catch (error) {
    console.error("❌ Failed to load articles:", error);
    data = [];
  }

  const posts = data
    .filter((p) => p?.id)
    .sort((a, b) => safeTime(b?.createdAt) - safeTime(a?.createdAt));

  const sectionClass = [
    "relative overflow-hidden",
    "py-8",
    "mt-[112px] md:mt-[157px]",
    "bg-[#070A16] text-white",
  ].join(" ");

  if (!posts || posts.length === 0) {
    return (
      <section className={sectionClass} dir={isArabic ? "rtl" : "ltr"}>
        <BgDecor />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)]">
            <h2 className="text-2xl font-extrabold text-white">
              {t("noArticles")}
            </h2>
            <p className="mt-2 text-sm text-white/60">
              {isArabic
                ? "لم يتم نشر مقالات بعد."
                : "No articles have been published yet."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass} dir={isArabic ? "rtl" : "ltr"}>
      <BgDecor />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
            {isArabic ? "المدونة" : "Blog"}
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
            {isArabic ? "المقالات" : "Articles"}
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-white/65">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const title = (isArabic ? post?.nameAr : post?.nameEn) || t("untitled");
            const desc =
              (isArabic ? post?.descriptionAr : post?.descriptionEn) ||
              t("noDescription");

            const trainerName = isArabic
              ? post?.trainer?.nameAr
              : post?.trainer?.nameEn;

            const dateParts = post?.createdAt
              ? formatDateParts(post.createdAt, locale)
              : null;

            return (
              <article
                key={post.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.06]"
              >
                {/* glow hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -inset-24 bg-gradient-to-r from-transparent via-[var(--main-color)]/12 to-transparent blur-2xl" />
                </div>

                {/* accent */}
                <div className="h-1 w-full bg-[var(--main-color)]" />

                {/* Date badge */}
                {dateParts && (
                  <div
                    className={[
                      "absolute top-4 z-10",
                      isArabic ? "right-4" : "left-4",
                    ].join(" ")}
                  >
                    <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-white backdrop-blur shadow-sm">
                      <div className="text-lg font-extrabold leading-none">
                        {dateParts.day}
                      </div>
                      <div className="text-xs uppercase leading-none opacity-90 mt-1">
                        {dateParts.month}
                      </div>
                      <div className="text-[11px] leading-none opacity-90 mt-1">
                        {dateParts.year}
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative p-6 pt-14">
                  {/* icon */}
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-3xl border border-white/10 bg-white/[0.05] grid place-items-center shadow-inner">
                      <FaBookOpen className="text-[var(--main-color)]" size={26} />
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="mt-16 text-lg font-extrabold text-white line-clamp-2 text-center">
                    {title}
                  </h3>

                  {/* desc */}
                  <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-3 text-center">
                    {desc}
                  </p>

                  {/* button */}
                  <div className="mt-6 text-center">
                    <Link
                      href={`/${locale}/blog/${post.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--main-color)] px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(99,102,241,0.18)] transition hover:bg-[var(--secondary-color-2)]"
                    >
                      {t("readMore")}
                    </Link>
                  </div>

                  {/* trainer */}
                  <div
                    className={[
                      "mt-5 flex items-center justify-center gap-2 text-sm text-white/65",
                      isArabic ? "flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    <FaUser className="text-[var(--main-color)]" />
                    <span className="max-w-[240px] truncate">
                      {trainerName || (isArabic ? "بدون مدرب" : "No trainer")}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* optional back/home actions */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full bg-white/[0.06] px-8 py-3 text-sm font-extrabold text-white ring-1 ring-white/10 transition hover:bg-white/[0.09]"
          >
            {isArabic ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark section decor ---------- */
function BgDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />
    </>
  );
}