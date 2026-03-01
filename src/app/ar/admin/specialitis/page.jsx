"use client";

import { useEffect, useMemo, useState } from "react";
import { specialitisSrvis } from "@/services/specialitiesServis";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaSearch, FaSpinner } from "react-icons/fa";

export default function SpecialitiesPage() {
  const [specialities, setSpecialities] = useState([]);
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
    }),
    []
  );

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchSpecialities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSpecialities = async () => {
    setLoading(true);
    try {
      const data = await specialitisSrvis.getAll();
      setSpecialities(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("Unable to fetch specialities:", err);
      setSpecialities([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return specialities;

    return specialities.filter((s) => {
      const nameEn = (s.nameEn || "").toLowerCase();
      const nameAr = (s.nameAr || "").toLowerCase();
      const descEn = (s.descriptionEn || "").toLowerCase();
      const descAr = (s.descriptionAr || "").toLowerCase();
      return (
        nameEn.includes(q) || nameAr.includes(q) || descEn.includes(q) || descAr.includes(q)
      );
    });
  }, [specialities, query]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      nameEn: item.nameEn || "",
      nameAr: item.nameAr || "",
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await specialitisSrvis.updateOne(editingId, formData);
      } else {
        await specialitisSrvis.createOne(formData);
      }

      await fetchSpecialities();
      closeForm();
    } catch (err) {
      console.error("Error saving speciality:", err);
      alert("فشل حفظ الاختصاص");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الاختصاص؟")) return;

    try {
      await specialitisSrvis.deleteOne(id);
      // Optimistic UI
      setSpecialities((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Error deleting speciality:", err);
      alert("فشل حذف الاختصاص");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070A16] text-white px-4 md:px-6 py-6 space-y-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-32 -right-40 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
            لوحة الإدارة
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
            إدارة الاختصاصات
          </h2>
          <p className="mt-1 text-sm text-white/65">
            أضف وعدّل واحذف الاختصاصات مع بحث سريع.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--main-color)] px-4 py-2.5 text-white shadow-[0_0_30px_rgba(99,102,241,0.18)] hover:bg-[var(--secondary-color-2)] transition"
        >
          <FaPlus />
          <span className="font-semibold">إضافة اختصاص</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <label className="block text-xs font-semibold text-white/70 mb-1">
            بحث
          </label>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الوصف..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/35"
            />
          </div>
        </div>

        <StatCard title="المعروضة" value={filtered.length} />
        <StatCard title="الإجمالي" value={specialities.length} />
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] overflow-hidden">
          {saving && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-black/35 backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                <FaSpinner className="animate-spin" />
                <span className="text-sm font-semibold text-white">جاري الحفظ...</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10">
            <div>
              <div className="text-lg font-extrabold text-white">
                {editingId ? "تعديل اختصاص" : "إضافة اختصاص جديد"}
              </div>
              <div className="text-xs text-white/60">أدخل البيانات ثم اضغط حفظ.</div>
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
                  placeholder="Software Engineering"
                  required
                />
              </Field>

              <Field label="الاسم (عربي)">
                <input
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="هندسة البرمجيات"
                  required
                />
              </Field>

              <Field label="Description (EN)">
                <input
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="Speciality description..."
                />
              </Field>

              <Field label="الوصف (عربي)">
                <input
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="وصف الاختصاص..."
                />
              </Field>
            </div>

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
                {editingId ? "تحديث الاختصاص" : "حفظ الاختصاص"}
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
            <div className="text-sm font-extrabold text-white">قائمة الاختصاصات</div>
            <button
              onClick={fetchSpecialities}
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
                  <th className="px-4 md:px-6 py-4 text-center font-bold">إجراءات</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10">
                      <EmptyStateDark title="لا توجد اختصاصات" desc="ابدأ بإضافة اختصاص جديد أو غيّر البحث." />
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-white/10 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="font-extrabold text-white">{item.nameAr || "-"}</div>
                        <div className="text-xs text-white/55">{item.nameEn || "-"}</div>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <div className="text-white/85 line-clamp-2">{item.descriptionAr || "-"}</div>
                        <div className="text-xs text-white/55 line-clamp-2 mt-1">{item.descriptionEn || "-"}</div>
                      </td>

                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/85 hover:bg-white/[0.06] transition"
                            title="تعديل"
                          >
                            <FaEdit />
                            <span className="hidden md:inline">تعديل</span>
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
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
    <div className="lg:col-span-2">
      <label className="block text-xs font-semibold text-white/70 mb-1">
        ملخص
      </label>
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