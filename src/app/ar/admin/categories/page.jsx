"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaSearch, FaTag, FaSpinner } from "react-icons/fa";

export default function CategoriesPage() {
  const apiUrl = `${baseUrl}/categories`;

  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const emptyForm = useMemo(
    () => ({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      tags: [""],
    }),
    []
  );

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const resp = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(resp.data) ? resp.data : resp.data?.data || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unable to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories.filter((c) => {
      const nameEn = (c.nameEn || "").toLowerCase();
      const nameAr = (c.nameAr || "").toLowerCase();
      const descEn = (c.descriptionEn || "").toLowerCase();
      const descAr = (c.descriptionAr || "").toLowerCase();
      const tags = (c.tags || []).join(" ").toLowerCase();
      return (
        nameEn.includes(q) ||
        nameAr.includes(q) ||
        descEn.includes(q) ||
        descAr.includes(q) ||
        tags.includes(q)
      );
    });
  }, [categories, query]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      nameEn: cat.nameEn || "",
      nameAr: cat.nameAr || "",
      descriptionEn: cat.descriptionEn || "",
      descriptionAr: cat.descriptionAr || "",
      tags: Array.isArray(cat.tags) && cat.tags.length ? cat.tags : [""],
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleTagChange = (e, idx) => {
    const arr = [...formData.tags];
    arr[idx] = e.target.value;
    setFormData((p) => ({ ...p, tags: arr }));
  };

  const addTagField = () => {
    setFormData((p) => ({ ...p, tags: [...p.tags, ""] }));
  };

  const removeTagField = (idx) => {
    const next = formData.tags.filter((_, i) => i !== idx);
    setFormData((p) => ({ ...p, tags: next.length ? next : [""] }));
  };

  const normalizePayload = () => {
    const tags = (formData.tags || [])
      .map((t) => (t || "").trim())
      .filter(Boolean);

    return { ...formData, tags };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      const payload = normalizePayload();

      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(apiUrl, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchCategories();
      closeForm();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("فشل حفظ الفئة");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (catId) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    try {
      const token = getToken();
      await axios.delete(`${apiUrl}/${catId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optimistic UI
      setCategories((prev) => prev.filter((c) => c.id !== catId));
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("فشل حذف الفئة");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070A16] text-white px-4 md:px-6 py-6">
      {/* Background (behind everything) */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-32 -right-40 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
              لوحة الإدارة
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
              إدارة الفئات
            </h2>
            <p className="mt-1 text-sm text-white/65">
              أضف وعدّل واحذف الفئات مع بحث سريع ووسوم منظمة.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--main-color)] px-4 py-2.5 text-white shadow-[0_0_30px_rgba(99,102,241,0.18)] hover:bg-[var(--secondary-color-2)] transition"
          >
            <FaPlus />
            <span className="font-semibold">إضافة فئة</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <label className="block text-xs font-semibold text-white/70 mb-1">
              بحث
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم، الوصف، الوسوم..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/35"
              />
            </div>
          </div>

          <StatCard title="المعروضة" value={filtered.length} />
          <StatCard title="الإجمالي" value={categories.length} />
        </div>

        {/* Form Modal/Card */}
        {showForm && (
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] overflow-hidden">
            {saving && (
              <div className="absolute inset-0 z-20 grid place-items-center bg-black/35 backdrop-blur-sm">
                <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                  <FaSpinner className="animate-spin" />
                  <span className="text-sm font-semibold text-white">
                    جاري الحفظ...
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10">
              <div>
                <div className="text-lg font-extrabold text-white">
                  {editingId ? "تعديل فئة" : "إضافة فئة جديدة"}
                </div>
                <div className="text-xs text-white/60">
                  أدخل البيانات ثم اضغط حفظ.
                </div>
              </div>

              <button
                onClick={closeForm}
                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center justify-center"
                aria-label="close"
              >
                <FaTimes className="text-white/70" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name (EN)">
                  <input
                    name="nameEn"
                    value={formData.nameEn}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="web development"
                    required
                  />
                </Field>

                <Field label="الاسم (عربي)">
                  <input
                    name="nameAr"
                    value={formData.nameAr}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="تطوير الويب"
                    required
                  />
                </Field>

                <Field label="Description (EN)">
                  <input
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="web development courses"
                  />
                </Field>

                <Field label="الوصف (عربي)">
                  <input
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="كورسات تطوير الويب"
                  />
                </Field>
              </div>

              {/* Tags */}
              <div className="rounded-3xl border border-white/10 bg-[#0B1022]/55 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      <FaTag className="text-white/80" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white">الوسوم</div>
                      <div className="text-xs text-white/60">
                        أضف كلمات مفتاحية تساعد بالبحث.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addTagField}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.08] border border-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/[0.12] transition"
                  >
                    <FaPlus />
                    إضافة وسم
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.tags.map((tag, idx) => (
                    <div key={`tag-${idx}`} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(e, idx)}
                        className="input-dark"
                        placeholder={`Tag #${idx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeTagField(idx)}
                        className="h-12 w-12 rounded-2xl border border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/15 transition flex items-center justify-center"
                        aria-label="remove-tag"
                        title="حذف الوسم"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/85 hover:bg-white/[0.06] transition"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto rounded-2xl bg-[var(--main-color)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(99,102,241,0.18)] hover:bg-[var(--secondary-color-2)] transition disabled:opacity-60"
                >
                  {editingId ? "تحديث الفئة" : "حفظ الفئة"}
                </button>
              </div>
            </form>

            <style jsx global>{`
              .input-dark {
                width: 100%;
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 12px 14px;
                outline: none;
                background: rgba(255, 255, 255, 0.03);
                color: white;
                transition: 0.2s;
              }
              .input-dark::placeholder {
                color: rgba(255, 255, 255, 0.4);
              }
              .input-dark:focus {
                border-color: rgba(99, 102, 241, 0.45);
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
                background: rgba(255, 255, 255, 0.05);
              }
            `}</style>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <LoadingBlockDark />
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10">
              <div className="text-sm font-extrabold text-white">قائمة الفئات</div>
              <button
                onClick={fetchCategories}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06] transition"
              >
                تحديث
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/[0.03] text-white/70">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">الاسم</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">الوصف</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">Tags</th>
                    <th className="px-4 md:px-6 py-4 text-center font-bold">إجراءات</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10">
                        <EmptyStateDark title="لا توجد فئات" desc="ابدأ بإضافة فئة جديدة أو غيّر البحث." />
                      </td>
                    </tr>
                  ) : (
                    filtered.map((cat) => (
                      <tr
                        key={cat.id}
                        className="border-t border-white/10 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 md:px-6 py-4">
                          <div className="font-extrabold text-white">{cat.nameAr || "-"}</div>
                          <div className="text-xs text-white/55">{cat.nameEn || "-"}</div>
                        </td>

                        <td className="px-4 md:px-6 py-4">
                          <div className="text-white/85 line-clamp-2">{cat.descriptionAr || "-"}</div>
                          <div className="text-xs text-white/55 line-clamp-2 mt-1">{cat.descriptionEn || "-"}</div>
                        </td>

                        <td className="px-4 md:px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {(cat.tags || []).length ? (
                              cat.tags.map((t, i) => (
                                <span
                                  key={`${cat.id}-tag-${i}`}
                                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/85"
                                >
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span className="text-white/35">—</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(cat)}
                              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/85 hover:bg-white/[0.06] transition"
                              title="تعديل"
                            >
                              <FaEdit />
                              <span className="hidden md:inline">تعديل</span>
                            </button>

                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-red-200 hover:bg-red-500/15 transition"
                              title="حذف"
                            >
                              <FaTrash />
                              <span className="hidden md:inline">حذف</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------- UI helpers (Dark) --------------------- */

function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs font-bold text-white/70 mb-1">{label}</div>
      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="lg:col-span-3">
      <label className="block text-xs font-semibold text-white/70 mb-1">ملخص</label>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-sm">
        <div className="text-xs text-white/55">{title}</div>
        <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
      </div>
    </div>
  );
}

function EmptyStateDark({ title, desc }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
      <div className="text-lg font-extrabold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function LoadingBlockDark() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="h-4 w-44 bg-white/10 rounded animate-pulse" />
        <div className="mt-2 h-3 w-28 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="p-6 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-white/10 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}