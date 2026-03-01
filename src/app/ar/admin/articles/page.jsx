"use client";

import { useEffect, useMemo, useState } from "react";
import { categorySrvis } from "@/services/categoryServis";
import { trainersSrvis } from "@/services/trainersServis";
import { articleServis } from "@/services/articleServis";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaRegCircle,
  FaCheckCircle,
  FaBookOpen,
  FaTags,
  FaUserTie,
  FaGlobe,
  FaAlignLeft,
} from "react-icons/fa";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    contentEn: "",
    contentAr: "",
    categoryId: "",
    trainerId: "",
    published: false,
  });

  const [pageLoading, setPageLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // boot
  useEffect(() => {
    let mounted = true;
    async function boot() {
      setPageLoading(true);
      try {
        const [a, c, t] = await Promise.all([
          articleServis.getAll(),
          categorySrvis.getAll(),
          trainersSrvis.getAll(),
        ]);

        if (!mounted) return;

        const list = a?.data?.data ?? a?.data ?? a ?? [];
        setArticles(Array.isArray(list) ? list : []);
        setCategories(Array.isArray(c) ? c : []);
        setTrainers(Array.isArray(t) ? t : []);
      } catch (err) {
        console.error("Boot error:", err);
      } finally {
        if (mounted) setPageLoading(false);
      }
    }
    boot();
    return () => {
      mounted = false;
    };
  }, []);

  const categoryMap = useMemo(() => {
    const m = new Map();
    categories.forEach((c) => m.set(String(c.id), c));
    return m;
  }, [categories]);

  const trainerMap = useMemo(() => {
    const m = new Map();
    trainers.forEach((t) => m.set(String(t.id), t));
    return m;
  }, [trainers]);

  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a?.published === true).length;
    const draft = total - published;
    return { total, published, draft };
  }, [articles]);

  const refreshArticles = async () => {
    const a = await articleServis.getAll();
    const list = a?.data?.data ?? a?.data ?? a ?? [];
    setArticles(Array.isArray(list) ? list : []);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      contentEn: "",
      contentAr: "",
      categoryId: "",
      trainerId: "",
      published: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await articleServis.updateOne(editingId, formData);
      } else {
        await articleServis.createOne(formData);
      }

      resetForm();
      await refreshArticles();
    } catch (err) {
      console.error("Error saving article:", err);
      alert("فشل حفظ المقال");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      nameEn: art.nameEn || "",
      nameAr: art.nameAr || "",
      descriptionEn: art.descriptionEn || "",
      descriptionAr: art.descriptionAr || "",
      contentEn: art.contentEn || "",
      contentAr: art.contentAr || "",
      categoryId: art.categoryId ?? "",
      trainerId: art.trainerId ?? "",
      published: !!art.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    try {
      await articleServis.deleteOne(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("فشل حذف المقال");
    }
  };

  const togglePublish = async (art) => {
    try {
      // إذا عندك API مخصص (مثل updatePublishidStatus)
      await articleServis.updatePublishidStatus(art.id);
      setArticles((prev) =>
        prev.map((a) => (a.id === art.id ? { ...a, published: !a.published } : a))
      );
    } catch (err) {
      console.error("Error updating publish status:", err);
      alert("فشل تحديث حالة النشر");
    }
  };

  return (
    <section className="relative px-4 md:px-6 py-6 bg-[#070A16] text-white">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
              لوحة الإدارة
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
              إدارة المقالات
            </h2>
            <p className="mt-1 text-sm text-white/70">
              إضافة/تعديل/حذف المقالات وربطها بالفئات والمدربين.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <StatCard label="الإجمالي" value={stats.total} />
            <StatCard label="منشور" value={stats.published} highlight />
            <StatCard label="مسودة" value={stats.draft} />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10"
        >
          {saving && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-[#070A16]/55 backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10 shadow-sm">
                <FaSpinner className="animate-spin" />
                <span className="text-sm font-semibold text-white">
                  جاري الحفظ...
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.06] text-white grid place-items-center ring-1 ring-white/10">
                {editingId ? <FaEdit /> : <FaPlus />}
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {editingId ? "تعديل مقال" : "إضافة مقال جديد"}
                </div>
                <div className="text-xs text-white/60">
                  العنوان والوصف والمحتوى ثم اربط الفئة والمدرب.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl px-4 py-2 text-sm font-semibold bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.08] transition"
            >
              تفريغ النموذج
            </button>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title (EN)" icon={<FaGlobe />}>
                <input
                  name="nameEn"
                  placeholder="Article title in English"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="العنوان (عربي)" icon={<FaAlignLeft />}>
                <input
                  name="nameAr"
                  placeholder="عنوان المقال بالعربية"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="Description (EN)">
                <input
                  name="descriptionEn"
                  placeholder="Short description in English"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="input-dark"
                />
              </Field>

              <Field label="الوصف (عربي)">
                <input
                  name="descriptionAr"
                  placeholder="وصف مختصر بالعربية"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  className="input-dark"
                />
              </Field>

              <Field label="Content (EN) HTML" icon={<FaBookOpen />}>
                <textarea
                  name="contentEn"
                  placeholder="<p>...</p>"
                  value={formData.contentEn}
                  onChange={handleChange}
                  className="input-dark min-h-[140px] resize-none md:col-span-2"
                />
              </Field>

              <Field label="المحتوى (عربي) HTML" icon={<FaBookOpen />}>
                <textarea
                  name="contentAr"
                  placeholder="<p>...</p>"
                  value={formData.contentAr}
                  onChange={handleChange}
                  className="input-dark min-h-[140px] resize-none md:col-span-2"
                />
              </Field>

              <Field label="الفئة" icon={<FaTags />}>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameAr} / {cat.nameEn}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="المدرب" icon={<FaUserTie />}>
                <select
                  name="trainerId"
                  value={formData.trainerId}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">اختر المدرب</option>
                  {trainers.map((tr) => (
                    <option key={tr.id} value={tr.id}>
                      {tr.nameAr} / {tr.nameEn}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="flex items-end">
                <label className="w-full flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-2">
                    {formData.published ? (
                      <FaCheckCircle className="text-green-400" />
                    ) : (
                      <FaRegCircle className="text-white/40" />
                    )}
                    <span className="text-sm font-semibold text-white">
                      نشر
                    </span>
                  </div>
                  <input
                    name="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[var(--main-color)]"
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl py-3 font-bold text-white bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)] transition shadow-[0_0_25px_rgba(99,102,241,0.18)]"
                >
                  {editingId ? "تحديث المقال" : "إضافة مقال جديد"}
                </button>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .input-dark {
              width: 100%;
              border-radius: 14px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              padding: 10px 12px;
              outline: none;
              background: rgba(255, 255, 255, 0.04);
              color: white;
              transition: 0.2s;
            }
            .input-dark::placeholder {
              color: rgba(255, 255, 255, 0.38);
            }
            .input-dark:focus {
              border-color: rgba(99, 102, 241, 0.45);
              box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
            }
            select.input-dark option {
              color: #0b1022;
            }
          `}</style>
        </form>

        {/* List */}
        <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)] ring-1 ring-white/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.06] grid place-items-center text-white ring-1 ring-white/10">
                <FaBookOpen />
              </div>
              <div>
                <div className="text-sm font-bold text-white">قائمة المقالات</div>
                <div className="text-xs text-white/60">{articles.length} مقال</div>
              </div>
            </div>

            {pageLoading && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <FaSpinner className="animate-spin" />
                تحميل...
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-white/70">
                <tr>
                  <th className="py-3 px-4 text-right">العنوان</th>
                  <th className="py-3 px-4 text-right">الفئة</th>
                  <th className="py-3 px-4 text-right">المدرب</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-center">إجراءات</th>
                </tr>
              </thead>

              <tbody>
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-white/55">
                      لا توجد مقالات حالياً
                    </td>
                  </tr>
                ) : (
                  articles.map((art) => {
                    const cat = categoryMap.get(String(art.categoryId));
                    const tr = trainerMap.get(String(art.trainerId));
                    const isPub = !!art.published;

                    return (
                      <tr
                        key={art.id}
                        className="border-t border-white/10 hover:bg-white/[0.03]"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{art.nameAr}</div>
                          <div className="text-xs text-white/55">{art.nameEn}</div>
                        </td>

                        <td className="py-3 px-4 text-white/85">
                          {cat?.nameAr || cat?.nameEn || art.categoryId || "—"}
                        </td>

                        <td className="py-3 px-4 text-white/85">
                          {tr?.nameAr || tr?.nameEn || art.trainerId || "—"}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => togglePublish(art)}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                              ${
                                isPub
                                  ? "bg-green-500/90 hover:bg-green-500"
                                  : "bg-gray-500/70 hover:bg-gray-500"
                              }`}
                          >
                            {isPub ? <FaCheckCircle /> : <FaRegCircle />}
                            {isPub ? "منشور" : "غير منشور"}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(art)}
                              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                            >
                              <FaEdit /> تعديل
                            </button>
                            <button
                              onClick={() => handleDelete(art.id)}
                              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/15 transition"
                            >
                              <FaTrash /> حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden p-4 space-y-3">
            {articles.length === 0 ? (
              <div className="py-10 text-center text-white/55">
                لا توجد مقالات حالياً
              </div>
            ) : (
              articles.map((art) => {
                const cat = categoryMap.get(String(art.categoryId));
                const tr = trainerMap.get(String(art.trainerId));
                const isPub = !!art.published;

                return (
                  <div
                    key={art.id}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-extrabold text-white">
                          {art.nameAr}
                        </div>
                        <div className="text-xs text-white/55 mt-1">{art.nameEn}</div>

                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/75">
                          <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-2">
                            <div className="text-[11px] text-white/55">الفئة</div>
                            <div className="font-bold">
                              {cat?.nameAr || cat?.nameEn || "—"}
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-2">
                            <div className="text-[11px] text-white/55">المدرب</div>
                            <div className="font-bold">
                              {tr?.nameAr || tr?.nameEn || "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => togglePublish(art)}
                        className={`shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                          ${isPub ? "bg-green-500/90" : "bg-gray-500/70"}`}
                      >
                        {isPub ? "منشور" : "غير منشور"}
                      </button>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(art)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                      >
                        <FaEdit /> تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/15 transition"
                      >
                        <FaTrash /> حذف
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- UI Helpers (Dark) ----------------- */

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 ring-1 shadow-sm ${
        highlight
          ? "bg-[var(--main-color)] text-white ring-[var(--main-color)] shadow-[0_0_25px_rgba(99,102,241,0.18)]"
          : "bg-white/[0.04] text-white ring-white/10"
      }`}
    >
      <div className={`text-xs ${highlight ? "text-white/85" : "text-white/60"}`}>
        {label}
      </div>
      <div className="mt-1 text-xl font-extrabold">{value}</div>
    </div>
  );
}

function Field({ label, children, icon }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-xs font-bold text-white/75">
        {icon ? <span className="text-white/60">{icon}</span> : null}
        <span>{label}</span>
      </div>
      {children}
    </label>
  );
}