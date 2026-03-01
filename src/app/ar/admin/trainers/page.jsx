"use client";

import { useEffect, useMemo, useState } from "react";
import { trainersSrvis } from "@/services/trainersServis";
import { specialitisSrvis } from "@/services/specialitiesServis";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaUserTie,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
} from "react-icons/fa";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    bioEn: "",
    bioAr: "",
    specialityId: "",
  });

  const [loading, setLoading] = useState(false); // form submit
  const [pageLoading, setPageLoading] = useState(false); // initial fetch
  const [editingId, setEditingId] = useState(null);

  // ✅ تحميل البيانات
  useEffect(() => {
    let mounted = true;

    async function boot() {
      setPageLoading(true);
      try {
        const [t, s] = await Promise.all([
          trainersSrvis.getAll(),
          specialitisSrvis.getAll(),
        ]);
        if (!mounted) return;

        setTrainers(Array.isArray(t) ? t : []);
        setSpecialities(Array.isArray(s) ? s : []);
      } catch (err) {
        console.error("Error fetching trainers/specialities:", err);
      } finally {
        if (mounted) setPageLoading(false);
      }
    }

    boot();
    return () => {
      mounted = false;
    };
  }, []);

  const specialityMap = useMemo(() => {
    const m = new Map();
    specialities.forEach((s) => m.set(String(s.id), s));
    return m;
  }, [specialities]);

  const stats = useMemo(() => {
    const total = trainers.length;
    const active = trainers.filter((t) => t?.active === true).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [trainers]);

  // ✅ تغيّر القيم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nameEn: "",
      nameAr: "",
      bioEn: "",
      bioAr: "",
      specialityId: "",
    });
  };

  const refreshTrainers = async () => {
    const data = await trainersSrvis.getAll();
    setTrainers(Array.isArray(data) ? data : []);
  };

  // ✅ إضافة / تعديل مدرب
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        specialityId: Number(formData.specialityId),
      };

      if (editingId) {
        await trainersSrvis.updateOne(editingId, payload);
      } else {
        await trainersSrvis.createOne(payload);
      }

      resetForm();
      await refreshTrainers();
    } catch (err) {
      console.error("Error saving trainer:", err);
      alert("فشل حفظ بيانات المدرب");
    } finally {
      setLoading(false);
    }
  };

  // ✅ تعديل
  const handleEdit = (trainer) => {
    setEditingId(trainer.id);
    setFormData({
      nameEn: trainer.nameEn || "",
      nameAr: trainer.nameAr || "",
      bioEn: trainer.bioEn || "",
      bioAr: trainer.bioAr || "",
      specialityId: trainer.specialityId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ حذف
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المدرّب؟")) return;
    try {
      await trainersSrvis.deleteOne(id);
      setTrainers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting trainer:", err);
      alert("فشل حذف المدرب");
    }
  };

  // ✅ تفعيل / تعطيل
  const handleToggleActive = async (id, isActive) => {
    try {
      await trainersSrvis.updateStatus(id, { active: !isActive });
      setTrainers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, active: !isActive } : t))
      );
    } catch (err) {
      console.error("Error toggling trainer status:", err);
      alert("فشل تحديث الحالة");
    }
  };

  // ✅ رفع صورة
  const handlePhotoChange = async (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await trainersSrvis.updatePhoto(id, fd);
      const photoUrl = res?.photoUrl || res?.imageUrl || res?.url;

      setTrainers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, imageUrl: photoUrl } : t))
      );
    } catch (err) {
      console.error("Error updating photo:", err);
      alert("فشل رفع الصورة");
    } finally {
      // حتى لو ما اخترت نفس الملف مرة تانية
      e.target.value = "";
    }
  };

  return (
    <section className="relative px-4 md:px-6 py-6 bg-[#070A16] text-white">
      {/* خلفية dots / glow */}
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
              إدارة المدربين
            </h2>
            <p className="mt-1 text-sm text-white/70">
              إضافة/تعديل/حذف المدربين وتغيير الحالة ورفع الصور.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <StatCard label="الإجمالي" value={stats.total} />
            <StatCard label="نشط" value={stats.active} highlight />
            <StatCard label="غير نشط" value={stats.inactive} />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10"
        >
          {loading && (
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
                  {editingId ? "تعديل مدرب" : "إضافة مدرب جديد"}
                </div>
                <div className="text-xs text-white/60">
                  أدخل الاسم والوصف ثم اختر الاختصاص.
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
              <Field label="Name (EN)">
                <input
                  name="nameEn"
                  placeholder="Trainer name in English"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="الاسم (عربي)">
                <input
                  name="nameAr"
                  placeholder="اسم المدرب بالعربية"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="input-dark"
                />
              </Field>

              <Field label="Bio (EN)">
                <textarea
                  name="bioEn"
                  placeholder="Short bio in English"
                  value={formData.bioEn}
                  onChange={handleChange}
                  className="input-dark min-h-[90px] resize-none"
                />
              </Field>

              <Field label="الوصف (عربي)">
                <textarea
                  name="bioAr"
                  placeholder="وصف مختصر بالعربية"
                  value={formData.bioAr}
                  onChange={handleChange}
                  className="input-dark min-h-[90px] resize-none"
                />
              </Field>

              <Field label="الاختصاص" icon={<FaLayerGroup />}>
                <select
                  name="specialityId"
                  value={formData.specialityId}
                  onChange={handleChange}
                  required
                  className="input-dark"
                >
                  <option value="">اختر الاختصاص</option>
                  {specialities.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.nameAr}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-3 font-bold text-white bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)] transition shadow-[0_0_25px_rgba(99,102,241,0.18)]"
                >
                  {editingId ? "تحديث بيانات المدرب" : "إضافة مدرب جديد"}
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
                <FaUserTie />
              </div>
              <div>
                <div className="text-sm font-bold text-white">قائمة المدربين</div>
                <div className="text-xs text-white/60">
                  {trainers.length} مدرب
                </div>
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
                  <th className="py-3 px-4 text-right">الصورة</th>
                  <th className="py-3 px-4 text-right">الاسم</th>
                  <th className="py-3 px-4 text-right">Bio</th>
                  <th className="py-3 px-4 text-right">الاختصاص</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {trainers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-white/55">
                      لا يوجد مدربون حالياً
                    </td>
                  </tr>
                ) : (
                  trainers.map((trainer) => {
                    const spec = specialityMap.get(String(trainer.specialityId));
                    const imgSrc = trainer.imageUrl || "/images/placeholder-avatar.png";

                    return (
                      <tr
                        key={trainer.id}
                        className="border-t border-white/10 hover:bg-white/[0.03]"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/10 bg-white/[0.04]">
                              <Image
                                src={imgSrc}
                                alt={trainer.nameAr || trainer.nameEn || "trainer"}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-white/[0.06] text-white ring-1 ring-white/10 hover:bg-white/[0.08] cursor-pointer transition">
                              <FaUpload />
                              رفع صورة
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handlePhotoChange(trainer.id, e)}
                              />
                            </label>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-white">
                            {trainer.nameAr || "—"}
                          </div>
                          <div className="text-xs text-white/55">
                            {trainer.nameEn || "—"}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-white/85 line-clamp-2">
                            {trainer.bioAr || "—"}
                          </div>
                          <div className="text-xs text-white/55 line-clamp-1 mt-1">
                            {trainer.bioEn || "—"}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-white/85">
                          {spec?.nameAr || "—"}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() =>
                              handleToggleActive(trainer.id, trainer.active)
                            }
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                              ${
                                trainer.active
                                  ? "bg-green-500/90 hover:bg-green-500"
                                  : "bg-rose-500/80 hover:bg-rose-500"
                              }`}
                          >
                            {trainer.active ? <FaCheckCircle /> : <FaTimesCircle />}
                            {trainer.active ? "نشط" : "غير نشط"}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(trainer)}
                              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                            >
                              <FaEdit /> تعديل
                            </button>
                            <button
                              onClick={() => handleDelete(trainer.id)}
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
            {trainers.length === 0 ? (
              <div className="py-10 text-center text-white/55">
                لا يوجد مدربون حالياً
              </div>
            ) : (
              trainers.map((trainer) => {
                const spec = specialityMap.get(String(trainer.specialityId));
                const imgSrc = trainer.imageUrl || "/images/placeholder-avatar.png";

                return (
                  <div
                    key={trainer.id}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/10 bg-white/[0.04]">
                          <Image
                            src={imgSrc}
                            alt={trainer.nameAr || trainer.nameEn || "trainer"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-extrabold text-white">
                            {trainer.nameAr || "—"}
                          </div>
                          <div className="text-xs text-white/55">
                            {trainer.nameEn || "—"}
                          </div>
                          <div className="text-xs text-white/70 mt-1">
                            {spec?.nameAr || "—"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleActive(trainer.id, trainer.active)}
                        className={`shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                          ${trainer.active ? "bg-green-500/90" : "bg-rose-500/80"}`}
                      >
                        {trainer.active ? "نشط" : "غير نشط"}
                      </button>
                    </div>

                    <div className="mt-3 text-sm text-white/80">
                      {trainer.bioAr || trainer.bioEn || "—"}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-white/[0.06] text-white ring-1 ring-white/10 hover:bg-white/[0.08] cursor-pointer transition">
                        <FaUpload /> رفع صورة
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handlePhotoChange(trainer.id, e)}
                        />
                      </label>

                      <button
                        onClick={() => handleEdit(trainer)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                      >
                        <FaEdit /> تعديل
                      </button>

                      <button
                        onClick={() => handleDelete(trainer.id)}
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