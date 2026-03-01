"use client";

import { useEffect, useMemo, useState } from "react";
import { coursesServis } from "@/services/coursesServis";
import { categorySrvis } from "@/services/categoryServis";
import { trainersSrvis } from "@/services/trainersServis";
import { levelsSrvis } from "@/services/levelsServis";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaRegCircle,
  FaSpinner,
  FaTags,
  FaUserTie,
  FaLayerGroup,
  FaLink,
  FaMoneyBillWave,
  FaListUl,
} from "react-icons/fa";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [levels, setLevels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState("");
const [uploading, setUploading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    categoryId: "",
    trainerId: "",
    levelId: "",
    published: false,
    price: 0,
    url: "",
    syllabusEn: [""],
    syllabusAr: [""],
  });

  // ✅ تحميل البيانات
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const [coursesData, categoriesData, trainersData, levelsData] =
          await Promise.all([
            coursesServis.getAll(),
            categorySrvis.getAll(),
            trainersSrvis.getAll(),
            levelsSrvis.getAll(),
          ]);

        if (!mounted) return;

        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setTrainers(Array.isArray(trainersData) ? trainersData : []);
        setLevels(Array.isArray(levelsData) ? levelsData : []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Maps سريعة للإسم حسب id
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

  const levelMap = useMemo(() => {
    const m = new Map();
    levels.forEach((l) => m.set(String(l.id), l));
    return m;
  }, [levels]);

  // ✅ إحصائيات
  const stats = useMemo(() => {
    const total = courses.length;
    const active = courses.filter((c) => c?.published === true).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [courses]);

  // ✅ فلترة
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (filterStatus === "active") return course?.published === true;
      if (filterStatus === "inactive") return course?.published === false;
      return true;
    });
  }, [courses, filterStatus]);

  const handlePickImage = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setImageFile(file);
  const preview = URL.createObjectURL(file);
  setImagePreview(preview);
};
  // ✅ تغييرات عامة
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ syllabus
  const handleSyllabusChange = (e, lang, idx) => {
    const arr = [...formData[lang]];
    arr[idx] = e.target.value;
    setFormData((p) => ({ ...p, [lang]: arr }));
  };

  const addSyllabusField = (lang) => {
    setFormData((p) => ({ ...p, [lang]: [...p[lang], ""] }));
  };

  const removeSyllabusField = (lang, idx) => {
    const arr = [...formData[lang]];
    arr.splice(idx, 1);
    setFormData((p) => ({ ...p, [lang]: arr.length ? arr : [""] }));
  };

const resetForm = () => {
  setEditingId(null);
  setImageFile(null);
  setImagePreview("");

  setFormData({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    categoryId: "",
    trainerId: "",
    levelId: "",
    published: false,
    price: 0,
    url: "",
    syllabusEn: [""],
    syllabusAr: [""],
  });
};

  // ✅ Edit
const handleEdit = (course) => {
  setEditingId(course.id);

  setFormData({
    nameEn: course.nameEn || "",
    nameAr: course.nameAr || "",
    descriptionEn: course.descriptionEn || "",
    descriptionAr: course.descriptionAr || "",
    categoryId: course.categoryId ?? "",
    trainerId: course.trainerId ?? "",
    levelId: course.levelId ?? "",
    published: !!course.published,
    price: course.price ?? 0,
    url: course.url || "",
    syllabusEn:
      Array.isArray(course.syllabusEn) && course.syllabusEn.length
        ? course.syllabusEn
        : [""],
    syllabusAr:
      Array.isArray(course.syllabusAr) && course.syllabusAr.length
        ? course.syllabusAr
        : [""],
  });

  setImagePreview(course.url || "");
  setImageFile(null);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكورس؟")) return;

    try {
      await coursesServis.deleteOne(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      const status = error?.response?.status;
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;

      console.error("❌ Delete failed:", {
        status,
        data: error?.response?.data,
        msg: serverMsg,
      });

      alert(
        `فشل حذف الكورس.\n` +
          `Status: ${status || "?"}\n` +
          `Message: ${serverMsg || "Server error"}`
      );
    }
  };

  // ✅ publish toggle
  const togglePublish = async (course) => {
    try {
      const nextPublished = !course.published;
      await coursesServis.updateOne(course.id, { published: nextPublished });

      setCourses((prev) =>
        prev.map((c) =>
          c.id === course.id ? { ...c, published: nextPublished } : c
        )
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };
const uploadImage = async (file) => {
  if (!file) return formData.url || "";

  setUploading(true);

  try {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Upload failed");

    return data.url;
  } catch (err) {
    console.error("Upload error:", err);
    alert("فشل رفع الصورة");
    return formData.url || "";
  } finally {
    setUploading(false);
  }
};
  // ✅ submit
const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    let imageUrl = formData.url || "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const payload = {
      ...formData,
      url: imageUrl,
      categoryId: formData.categoryId
        ? Number(formData.categoryId)
        : null,
      levelId: formData.levelId
        ? Number(formData.levelId)
        : null,
      price: Number(formData.price || 0),
    };

    if (editingId) {
      await coursesServis.updateOne(editingId, payload);
    } else {
      await coursesServis.createOne(payload);
    }

    const refreshed = await coursesServis.getAll();
    setCourses(Array.isArray(refreshed) ? refreshed : []);
    resetForm();
  } catch (err) {
    console.error("❌ Error saving course:", err);
    alert("فشل حفظ الكورس");
  } finally {
    setSaving(false);
  }
};

  return (
    <section className="relative px-4 md:px-6 py-6 bg-[#070A16] text-white">
      {/* خلفية dots / glow */}
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
              إدارة الكورسات
            </h2>
            <p className="mt-1 text-sm text-white/70">
              إضافة/تعديل/حذف الكورسات وتبديل حالة النشر بسرعة.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <StatCard label="الإجمالي" value={stats.total} />
            <StatCard label="المنشورة" value={stats.active} highlight />
            <StatCard label="غير منشورة" value={stats.inactive} />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <TabButton
            active={filterStatus === "all"}
            onClick={() => setFilterStatus("all")}
          >
            الكل
          </TabButton>
          <TabButton
            active={filterStatus === "active"}
            onClick={() => setFilterStatus("active")}
            tone="success"
          >
            المنشورة
          </TabButton>
          <TabButton
            active={filterStatus === "inactive"}
            onClick={() => setFilterStatus("inactive")}
            tone="muted"
          >
            غير منشورة
          </TabButton>

          <div className="flex-1" />
          <button
            type="button"
            onClick={resetForm}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.08] transition"
          >
            تفريغ النموذج
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative mb-10 overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10"
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
                  {editingId ? "تعديل كورس" : "إضافة كورس جديد"}
                </div>
                <div className="text-xs text-white/60">
                  أدخل البيانات الأساسية ثم المنهاج.
                </div>
              </div>
            </div>

            {editingId && (
              <div className="text-xs font-semibold text-white/70">
                ID:{" "}
                <span className="font-mono">{String(editingId).slice(0, 8)}…</span>
              </div>
            )}
          </div>

          <div className="p-5 md:p-6 space-y-6">
            {/* Basics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Course Name (EN)">
                <input
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                  className="input-dark"
                  placeholder="Back End Development"
                />
              </Field>

              <Field label="اسم الدورة (AR)">
                <input
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  className="input-dark"
                  placeholder="تطوير الباك اند"
                />
              </Field>

              <Field label="Description (EN)">
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="input-dark min-h-[90px] resize-none"
                  placeholder="Short description..."
                />
              </Field>

              <Field label="الوصف (AR)">
                <textarea
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  className="input-dark min-h-[90px] resize-none"
                  placeholder="وصف مختصر..."
                />
              </Field>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="التصنيف" icon={<FaTags />}>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameAr}
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
                      {tr.nameAr}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="المستوى" icon={<FaLayerGroup />}>
                <select
                  name="levelId"
                  value={formData.levelId}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">اختر المستوى</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.nameAr}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="السعر" icon={<FaMoneyBillWave />}>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-dark"
                  min={0}
                />
              </Field>

 <Field label="صورة الكورس">
  <input
    type="file"
    accept="image/*"
    onChange={handlePickImage}
    className="input-dark"
  />

  {(imagePreview || formData.url) && (
    <div className="mt-3 w-full h-40 rounded-2xl overflow-hidden border border-white/10">
      <img
        src={imagePreview || formData.url}
        alt="preview"
        className="w-full h-full object-cover"
      />
    </div>
  )}

  {uploading && (
    <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
      <FaSpinner className="animate-spin" />
      جاري رفع الصورة...
    </div>
  )}
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
                      منشور
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
            </div>

            {/* Syllabus */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SyllabusBox
                title="Syllabus (EN)"
                items={formData.syllabusEn}
                onAdd={() => addSyllabusField("syllabusEn")}
                onRemove={(idx) => removeSyllabusField("syllabusEn", idx)}
                onChange={(e, idx) => handleSyllabusChange(e, "syllabusEn", idx)}
                placeholderPrefix="Topic (EN)"
              />

              <SyllabusBox
                title="Syllabus (AR)"
                items={formData.syllabusAr}
                onAdd={() => addSyllabusField("syllabusAr")}
                onRemove={(idx) => removeSyllabusField("syllabusAr", idx)}
                onChange={(e, idx) => handleSyllabusChange(e, "syllabusAr", idx)}
                placeholderPrefix="موضوع"
              />
            </div>
          </div>

          <div className="border-t border-white/10 p-5 md:p-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-2xl py-3 font-bold text-white bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)] transition shadow-[0_0_25px_rgba(99,102,241,0.18)]"
            >
              {editingId ? "تحديث الدورة" : "إضافة دورة جديدة"}
            </button>
          </div>

          {/* small css helpers */}
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
                <FaListUl />
              </div>
              <div>
                <div className="text-sm font-bold text-white">قائمة الكورسات</div>
                <div className="text-xs text-white/60">
                  {filteredCourses.length} كورس
                </div>
              </div>
            </div>

            {loading && (
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
                  <th className="py-3 px-4 text-right">التصنيف</th>
                  <th className="py-3 px-4 text-right">المدرب</th>
                  <th className="py-3 px-4 text-right">المستوى</th>
                  <th className="py-3 px-4 text-right">السعر</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-center">إجراءات</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-white/55">
                      لا توجد كورسات حالياً
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => {
                    const cat = categoryMap.get(String(course.categoryId));
                    const tr = trainerMap.get(String(course.trainerId));
                    const lv = levelMap.get(String(course.levelId));

                    return (
                      <tr
                        key={course.id}
                        className="border-t border-white/10 hover:bg-white/[0.03]"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{course.nameAr}</div>
                          <div className="text-xs text-white/55">{course.nameEn}</div>
                        </td>

                        <td className="py-3 px-4 text-white/80">{cat?.nameAr || "—"}</td>
                        <td className="py-3 px-4 text-white/80">{tr?.nameAr || "—"}</td>
                        <td className="py-3 px-4 text-white/80">{lv?.nameAr || "—"}</td>

                        <td className="py-3 px-4 font-semibold text-white">
                          {Number(course.price || 0).toLocaleString()}$
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => togglePublish(course)}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                              ${
                                course.published
                                  ? "bg-green-500/90 hover:bg-green-500"
                                  : "bg-white/25 hover:bg-white/30"
                              }`}
                          >
                            {course.published ? <FaCheckCircle /> : <FaRegCircle />}
                            {course.published ? "منشور" : "غير منشور"}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(course)}
                              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                            >
                              <FaEdit /> تعديل
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
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
            {filteredCourses.length === 0 ? (
              <div className="py-10 text-center text-white/55">
                لا توجد كورسات حالياً
              </div>
            ) : (
              filteredCourses.map((course) => {
                const cat = categoryMap.get(String(course.categoryId));
                const tr = trainerMap.get(String(course.trainerId));
                const lv = levelMap.get(String(course.levelId));

                return (
                  <div
                    key={course.id}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-extrabold text-white">
                          {course.nameAr}
                        </div>
                        <div className="text-xs text-white/55 mt-1">{course.nameEn}</div>
                      </div>

                      <button
                        onClick={() => togglePublish(course)}
                        className={`shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white transition
                          ${course.published ? "bg-green-500/90" : "bg-white/25"}`}
                      >
                        {course.published ? "منشور" : "غير منشور"}
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/80">
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-2">
                        <div className="text-[11px] text-white/55">التصنيف</div>
                        <div className="font-bold">{cat?.nameAr || "—"}</div>
                      </div>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-2">
                        <div className="text-[11px] text-white/55">المدرب</div>
                        <div className="font-bold">{tr?.nameAr || "—"}</div>
                      </div>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-2">
                        <div className="text-[11px] text-white/55">المستوى</div>
                        <div className="font-bold">{lv?.nameAr || "—"}</div>
                      </div>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-2">
                        <div className="text-[11px] text-white/55">السعر</div>
                        <div className="font-bold">
                          {Number(course.price || 0).toLocaleString()}$
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/20 hover:bg-blue-500/15 transition"
                      >
                        <FaEdit /> تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
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

function TabButton({ active, onClick, children, tone }) {
  const base = "rounded-xl px-4 py-2 text-sm font-bold transition ring-1";

  const styles = active
    ? tone === "success"
      ? "bg-green-500/90 text-white ring-green-500/70"
      : tone === "muted"
      ? "bg-white/20 text-white ring-white/20"
      : "bg-[var(--main-color)] text-white ring-[var(--main-color)]"
    : "bg-white/[0.04] text-white/85 ring-white/10 hover:bg-white/[0.07]";

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
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

function SyllabusBox({
  title,
  items,
  onAdd,
  onRemove,
  onChange,
  placeholderPrefix,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-extrabold text-white">{title}</div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/[0.09] transition text-white"
        >
          <FaPlus /> إضافة
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((val, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              value={val}
              onChange={(e) => onChange(e, idx)}
              className="input-dark"
              placeholder={`${placeholderPrefix} #${idx + 1}`}
            />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="shrink-0 rounded-xl px-3 text-sm font-bold bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/15 transition"
              title="حذف"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}