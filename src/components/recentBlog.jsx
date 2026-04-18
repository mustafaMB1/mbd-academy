import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FaUser } from "react-icons/fa";
import { articleServis } from "@/services/articleServis";

function safeTime(dateInput) {
  if (!dateInput) return 0;
  const t = new Date(dateInput).getTime();
  return Number.isFinite(t) ? t : 0;
}

function formatDateParts(dateInput, locale) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString(locale === "ar" ? "ar" : "en", {
    month: "short",
  });
  const year = String(date.getFullYear());

  return { day, month, year };
}

export default async function RecentBlog({ isMargin }) {
  const locale = await getLocale();
  const t = await getTranslations("Blog");
  const isAr = locale === "ar";

  let data = [];
  try {
    const res = await articleServis.getAll();
    // بعض السيرفسات ترجع {data: []}، وبعضها []
    data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
  } catch (error) {
    console.error("❌ Failed to load articles:", error);
    data = [];
  }

  // أحدث 3 حسب createdAt (بدون افتراض ترتيب السيرفر)
  const posts = data
    .filter((p) => p?.id)
    .sort((a, b) => safeTime(b?.createdAt) - safeTime(a?.createdAt))
    .slice(0, 3);

  const sectionClass = [
    "relative overflow-hidden",
    "py-20",
    isMargin ? "md:mt-[169px]" : "",
    "bg-[#070A16] text-white",
  ].join(" ");

  if (posts.length === 0) {
    return (
      <section className={sectionClass} dir={isAr ? "rtl" : "ltr"}>
        <BgDecor />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)]">
            <h2 className="text-xl font-extrabold text-white">
              {t("noArticles")}
            </h2>
            <p className="mt-2 text-sm text-white/60">
              {isAr ? "جرّب لاحقاً أو أضف مقالات جديدة." : "Try again later or add new posts."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass} dir={isAr ? "rtl" : "ltr"}>
      <BgDecor />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
            {isAr ? "المدونة" : "Blog"}
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
            {t("title")}
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-white/65">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const title = (isAr ? post?.nameAr : post?.nameEn) || t("untitled");
            const desc = (isAr ? post?.descriptionAr : post?.descriptionEn) || t("noDescription");

            const trainerName = isAr
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

                {/* top accent */}
                <div className="h-1 w-full bg-[var(--main-color)]" />

                {/* Date badge */}
                {dateParts && (
                  <div
                    className={[
                      "absolute top-4 z-10",
                      isAr ? "right-4" : "left-4",
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

                <div className="relative p-6 pt-24">
                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-white line-clamp-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-3">
                    {desc}
                  </p>

                  {/* Footer */}
                  <div
                    className={[
                      "mt-6 flex items-center justify-between gap-3",
                      isAr ? "flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    <Link
                      href={`/${locale}/blog/${post.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--main-color)] px-5 py-2 text-sm font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.18)] transition hover:bg-[var(--secondary-color-2)]"
                    >
                      {t("readMore")}
                    </Link>

                    {trainerName ? (
                      <div
                        className={[
                          "flex items-center gap-2 text-sm text-white/65",
                          isAr ? "flex-row-reverse" : "",
                        ].join(" ")}
                        title={trainerName}
                      >
                        <FaUser className="text-[var(--main-color)]" />
                        <span className="max-w-[170px] truncate">
                          {trainerName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-white/35">
                        {isAr ? "—" : "—"}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center justify-center rounded-full bg-white/[0.06] px-8 py-3 text-sm font-extrabold text-white ring-1 ring-white/10 transition hover:bg-white/[0.09]"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark section decor (مثل باقي الموقع) ---------- */
function BgDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />
    </>
  );
}