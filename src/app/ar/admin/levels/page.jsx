"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaLayerGroup,
  FaRegCircle,
  FaCheckCircle,
  FaListUl,
} from "react-icons/fa";

export default function LevelsPage() {
  const apiUrl = `${baseUrl}/levels`;

  const [levels, setLevels] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
  });
  const [loading, setLoading] = useState(false); // fetch
  const [saving, setSaving] = useState(false); // submit
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = resp.data?.data ?? resp.data;
        if (mounted) setLevels(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Unable to fetch levels:", err);
        if (mounted) setLevels([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const stats = useMemo(() => {
    const total = levels.length;
    return { total };
  }, [levels]);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
    });
  };

  const fetchLevels = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = resp.data?.data ?? resp.data;
      setLevels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unable to fetch levels:", err);
      setLevels([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      await fetchLevels();
    } catch (err) {
      console.error("Error saving level:", err);
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      alert(`فشل الحفظ.\nStatus: ${status || "?"}\nMessage: ${msg || "-"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (lvl) => {
    setEditingId(lvl.id);
    setFormData({
      nameEn: lvl.nameEn || "",
      nameAr: lvl.nameAr || "",
      descriptionEn: lvl.descriptionEn || "",
      descriptionAr: lvl.descriptionAr || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستوى؟")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Optimistic UI
      setLevels((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting level:", err);
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      alert(`فشل الحذف.\nStatus: ${status || "?"}\nMessage: ${msg || "-"}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070A16] text-white px-4 md:px-6 py-6">
      {/* BG dots + blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
              لوحة الإدارة
            </div>

            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
              إدارة المستويات
            </h2>
            <p className="mt-1 text-sm text-white/65">
              إضافة/تعديل/حذف مستويات الكورسات بشكل سريع.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 w-full md:w-auto">
            <StatCard label="الإجمالي" value={stats.total} />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)]"
        >
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

          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 grid place-items-center text-white/90">
                {editingId ? <FaEdit /> : <FaPlus />}
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {editingId ? "تعديل مستوى" : "إضافة مستوى جديد"}
                </div>
                <div className="text-xs text-white/55">
                  أدخل الاسم والوصف ثم احفظ.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl px-4 py-2 text-xs font-bold bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.08] transition text-white/85"
            >
              تفريغ النموذج
            </button>
          </div>

          <div className="p-5 md:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name (EN)">
                <input
                  name="nameEn"
                  placeholder="Beginner"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="الاسم (عربي)">
                <input
                  name="nameAr"
                  placeholder="مبتدئ"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="Description (EN)">
                <input
                  name="descriptionEn"
                  placeholder="Short description..."
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="input-dark"
                />
              </Field>

              <Field label="الوصف (عربي)">
                <input
                  name="descriptionAr"
                  placeholder="وصف مختصر..."
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  className="input-dark"
                />
              </Field>
            </div>
          </div>

          <div className="border-t border-white/10 p-5 md:p-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-2xl py-3 font-extrabold text-white bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)] transition shadow-sm"
            >
              {editingId ? "تحديث المستوى" : "إضافة مستوى جديد"}
            </button>
          </div>

          <style jsx global>{`
            .input-dark {
              width: 100%;
              border-radius: 16px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 12px 14px;
              outline: none;
              background: rgba(255, 255, 255, 0.04);
              color: white;
              transition: 0.2s;
            }
            .input-dark::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }
            .input-dark:focus {
              border-color: rgba(99, 102, 241, 0.45);
              box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
              background: rgba(255, 255, 255, 0.06);
            }
          `}</style>
        </form>

        {/* List */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 grid place-items-center text-white/90">
                <FaListUl />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  قائمة المستويات
                </div>
                <div className="text-xs text-white/55">
                  {levels.length} مستوى
                </div>
              </div>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaSpinner className="animate-spin" />
                تحميل...
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-white/70">
                <tr>
                  <th className="py-3 px-4 text-right">الاسم</th>
                  <th className="py-3 px-4 text-right">الوصف</th>
                  <th className="py-3 px-4 text-center">إجراءات</th>
                </tr>
              </thead>

              <tbody>
                {levels.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-white/60">
                      لا توجد مستويات حالياً
                    </td>
                  </tr>
                ) : (
                  levels.map((lvl) => (
                    <tr
                      key={lvl.id}
                      className="border-t border-white/10 hover:bg-white/[0.03]"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{lvl.nameAr}</div>
                        <div className="text-xs text-white/55">{lvl.nameEn}</div>
                      </td>

                      <td className="py-3 px-4 text-white/80">
                        <div className="text-sm">{lvl.descriptionAr || "—"}</div>
                        <div className="text-xs text-white/55 mt-1">
                          {lvl.descriptionEn || "—"}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(lvl)}
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-white/[0.06] ring-1 ring-white/10 text-white/85 hover:bg-white/[0.08] transition"
                          >
                            <FaEdit /> تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(lvl.id)}
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-rose-500/10 ring-1 ring-rose-400/20 text-rose-200 hover:bg-rose-500/15 transition"
                          >
                            <FaTrash /> حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-3">
            {levels.length === 0 ? (
              <div className="py-10 text-center text-white/60">
                لا توجد مستويات حالياً
              </div>
            ) : (
              levels.map((lvl) => (
                <div
                  key={lvl.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-extrabold text-white">
                        {lvl.nameAr}
                      </div>
                      <div className="text-xs text-white/55 mt-1">
                        {lvl.nameEn}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/80">
                    <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-3">
                      <div className="text-[11px] text-white/55">الوصف</div>
                      <div className="mt-1 font-semibold">
                        {lvl.descriptionAr || "—"}
                      </div>
                      <div className="mt-1 text-xs text-white/55">
                        {lvl.descriptionEn || "—"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(lvl)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold bg-white/[0.06] ring-1 ring-white/10 text-white/85 hover:bg-white/[0.08] transition"
                    >
                      <FaEdit /> تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(lvl.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold bg-rose-500/10 ring-1 ring-rose-400/20 text-rose-200 hover:bg-rose-500/15 transition"
                    >
                      <FaTrash /> حذف
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- UI Helpers ----------------- */

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl px-4 py-3 bg-white/[0.04] ring-1 ring-white/10 shadow-sm">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-white">{value}</div>
    </div>
  );
}

function Field({ label, children, icon }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-xs font-bold text-white/70">
        {icon ? <span className="text-white/45">{icon}</span> : null}
        <span>{label}</span>
      </div>
      {children}
    </label>
  );
}