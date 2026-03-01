"use client";
import { useEffect, useMemo, useState } from "react";
import { feedbackSrvis } from "@/services/feedbackServis";
import { coursesServis } from "@/services/coursesServis";
import {
  FaPlus,
  FaTrash,
  FaStar,
  FaEdit,
  FaTimes,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";

export default function FeedbackDashboardPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  const [modal, setModal] = useState({ open: false, mode: "create" }); // create | edit
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const emptyForm = useMemo(
    () => ({
      courseId: "",
      rating: 5,
      commentEn: "",
      commentAr: "",
      email: "",
      fullName: "",
      userId: null,
    }),
    []
  );

  const [formData, setFormData] = useState(emptyForm);

  // 📦 تحميل الكورسات
  useEffect(() => {
    (async () => {
      try {
        const data = await coursesServis.getAll();
        setCourses(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        console.error("❌ Failed to load courses:", err);
      }
    })();
  }, []);

  // 📌 تحميل التقييمات حسب الكورس
  const fetchFeedbacks = async (courseId) => {
    if (!courseId) {
      setFeedbacks([]);
      return;
    }
    setLoading(true);
    try {
      const data = await feedbackSrvis.getAllForCourse(courseId);
      setFeedbacks(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("❌ Failed to load feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ فلترة بحث داخل التقييمات
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return feedbacks;

    return feedbacks.filter((fb) => {
      const name = (fb.fullName || "").toLowerCase();
      const email = (fb.email || "").toLowerCase();
      const ar = (fb.commentAr || "").toLowerCase();
      const en = (fb.commentEn || "").toLowerCase();
      return (
        name.includes(q) || email.includes(q) || ar.includes(q) || en.includes(q)
      );
    });
  }, [feedbacks, query]);

  // 🟢 فتح إضافة
  const openCreate = () => {
    setSelectedFeedback(null);
    setFormData({ ...emptyForm, courseId: selectedCourse || "" });
    setModal({ open: true, mode: "create" });
  };

  // ✏️ فتح تعديل
  const openEdit = (fb) => {
    setSelectedFeedback(fb);
    setFormData({
      courseId: fb.courseId,
      rating: fb.rating ?? 5,
      commentEn: fb.commentEn || "",
      commentAr: fb.commentAr || "",
      email: fb.email || "",
      fullName: fb.fullName || "",
      userId: fb.userId || null,
    });
    setModal({ open: true, mode: "edit" });
  };

  const closeModal = () => {
    setModal({ open: false, mode: "create" });
    setSelectedFeedback(null);
    setFormData(emptyForm);
  };

  // 🟢 إنشاء
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, userId: null };
      await feedbackSrvis.createOne(dataToSend);
      closeModal();
      if (selectedCourse) fetchFeedbacks(selectedCourse);
    } catch (err) {
      console.error("❌ Failed to create feedback:", err);
      alert("فشل إضافة التقييم");
    }
  };

  // 🟡 تحديث
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFeedback?.id) return;
      await feedbackSrvis.updateOne(selectedFeedback.id, formData);
      closeModal();
      if (selectedCourse) fetchFeedbacks(selectedCourse);
      alert("✅ تم تعديل التقييم بنجاح");
    } catch (err) {
      console.error("❌ Failed to update feedback:", err);
      alert("فشل التعديل");
    }
  };

  // 🔴 حذف
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await feedbackSrvis.deleteOne(id);
      if (selectedCourse) fetchFeedbacks(selectedCourse);
    } catch (err) {
      console.error("❌ Failed to delete:", err);
      alert("فشل الحذف");
    }
  };

  const courseNameById = useMemo(() => {
    const map = new Map();
    courses.forEach((c) => {
      map.set(c.id, c.nameAr || c.nameEn || "-");
    });
    return map;
  }, [courses]);

  return (
    <section className="relative overflow-hidden bg-[#070A16] text-white p-4 md:p-6">
      {/* BG dots + blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.65)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/18 via-purple-600/14 to-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-fuchsia-600/14 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary-color-1)]" />
                لوحة الإدارة
              </div>

              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
                إدارة التقييمات
              </h1>
              <p className="mt-1 text-sm text-white/65">
                اختر كورس ثم تحكم بالتقييمات (إضافة / تعديل / حذف) مع بحث سريع.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--main-color)] px-4 py-2.5 text-white shadow-sm hover:bg-[var(--secondary-color-2)] transition disabled:opacity-60"
              disabled={!selectedCourse}
              title={!selectedCourse ? "اختر كورس أولاً" : "إضافة تقييم"}
            >
              <FaPlus />
              <span className="font-semibold">إضافة تقييم</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* course select */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-semibold text-white/70 mb-1">
              الكورس
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedCourse(id);
                setQuery("");
                fetchFeedbacks(id);
              }}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white
                         focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30"
            >
              <option value="" className="text-black">
                اختر الكورس لعرض تقييماته
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id} className="text-black">
                  {c.nameAr || c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* search */}
          <div className="lg:col-span-5">
            <label className="block text-xs font-semibold text-white/70 mb-1">
              بحث داخل التقييمات
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم، الإيميل، التعليق..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm shadow-sm text-white
                           placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30 disabled:opacity-60"
                disabled={!selectedCourse}
              />
            </div>
          </div>

          {/* stats */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold text-white/70 mb-1">
              ملخص
            </label>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-sm">
              <div className="text-xs text-white/55">عدد التقييمات</div>
              <div className="mt-1 text-lg font-extrabold text-white">
                {selectedCourse ? filtered.length : 0}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {!selectedCourse ? (
          <EmptyState
            title="اختر كورس لعرض التقييمات"
            desc="بعد اختيار الكورس ستظهر التقييمات هنا."
          />
        ) : loading ? (
          <LoadingTable />
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10">
              <div>
                <div className="text-sm font-bold text-white">
                  {courseNameById.get(selectedCourse) || "—"}
                </div>
                <div className="text-xs text-white/55">
                  {filtered.length} تقييم/تقييمات
                </div>
              </div>

              <button
                onClick={openCreate}
                className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-white hover:bg-white/[0.08] transition disabled:opacity-60"
                disabled={!selectedCourse}
              >
                <FaPlus />
                إضافة
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/[0.03] text-white/70">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">التقييم</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">الاسم</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">الإيميل</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">تعليق عربي</th>
                    <th className="px-4 md:px-6 py-4 text-start font-bold">Comment EN</th>
                    <th className="px-4 md:px-6 py-4 text-center font-bold">إجراءات</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length ? (
                    filtered.map((fb) => (
                      <tr
                        key={fb.id}
                        className="border-t border-white/10 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 md:px-6 py-4">
                          <RatingPill value={fb.rating || 0} />
                        </td>

                        <td className="px-4 md:px-6 py-4 font-semibold text-white">
                          {fb.fullName || "-"}
                        </td>

                        <td className="px-4 md:px-6 py-4 text-white/80">
                          {fb.email || "-"}
                        </td>

                        <td className="px-4 md:px-6 py-4 text-white/80">
                          <span className="line-clamp-2">{fb.commentAr || "-"}</span>
                        </td>

                        <td className="px-4 md:px-6 py-4 text-white/80">
                          <span className="line-clamp-2">{fb.commentEn || "-"}</span>
                        </td>

                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(fb)}
                              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-white/85 hover:bg-white/[0.08] transition"
                              title="تعديل"
                            >
                              <FaEdit />
                              <span className="hidden md:inline">تعديل</span>
                            </button>

                            <button
                              onClick={() => handleDelete(fb.id)}
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-rose-200 hover:bg-rose-500/15 transition"
                              title="حذف"
                            >
                              <FaTrash />
                              <span className="hidden md:inline">حذف</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10">
                        <EmptyState
                          title="لا يوجد تقييمات"
                          desc="جرب إضافة تقييم جديد أو عدّل البحث."
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {modal.open && (
          <FeedbackModal
            mode={modal.mode}
            formData={formData}
            setFormData={setFormData}
            courses={courses}
            onClose={closeModal}
            onSubmit={modal.mode === "create" ? handleCreate : handleUpdate}
            lockCourse={!!selectedCourse}
            selectedCourse={selectedCourse}
          />
        )}
      </div>
    </section>
  );
}

/* -------------------------- UI Pieces -------------------------- */

function RatingPill({ value }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 px-3 py-1.5">
      <div className="flex items-center gap-1 text-yellow-300">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < v ? "" : "opacity-25"} />
        ))}
      </div>
      <span className="text-xs font-extrabold text-yellow-200">{v}/5</span>
    </div>
  );
}

function EmptyState({ title, desc }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
      <div className="text-lg font-extrabold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function LoadingTable() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="h-4 w-48 bg-white/10 rounded animate-pulse" />
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

/* -------------------------- Modal -------------------------- */

function FeedbackModal({
  mode,
  formData,
  setFormData,
  courses,
  onClose,
  onSubmit,
  lockCourse,
}) {
  const title = mode === "create" ? "إضافة تقييم" : "تعديل التقييم";
  const setRating = (r) => setFormData({ ...formData, rating: r });

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B1022]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <div className="text-lg font-extrabold text-white">{title}</div>
              <div className="text-xs text-white/60">املأ البيانات ثم اضغط حفظ.</div>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition flex items-center justify-center"
              aria-label="close"
            >
              <FaTimes className="text-white/75" />
            </button>
          </div>

          {/* body */}
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* course */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-white/70 mb-1">
                  الكورس
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) =>
                    setFormData({ ...formData, courseId: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30 disabled:opacity-70"
                  required
                  disabled={lockCourse}
                >
                  <option value="" className="text-black">
                    {lockCourse ? "تم اختيار الكورس" : "اختر الكورس"}
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id} className="text-black">
                      {course.nameAr || course.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* rating */}
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">
                  التقييم
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center gap-1 text-yellow-300">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const r = i + 1;
                      const active = r <= (formData.rating || 0);
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRating(r)}
                          className={`transition ${
                            active ? "" : "opacity-25 hover:opacity-60"
                          }`}
                          aria-label={`rate-${r}`}
                        >
                          <FaStar />
                        </button>
                      );
                    })}
                  </div>
                  <div className="ml-auto text-xs font-extrabold text-white/80">
                    {(formData.rating || 0)}/5
                  </div>
                </div>
              </div>

              {/* fullName */}
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white placeholder:text-white/40
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30"
                  required
                />
              </div>

              {/* email */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-white/70 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white placeholder:text-white/40
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30"
                  required
                />
              </div>

              {/* comment ar */}
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-white/70 mb-1">
                  تعليق عربي
                </label>
                <textarea
                  placeholder="اكتب التعليق بالعربي..."
                  value={formData.commentAr}
                  onChange={(e) =>
                    setFormData({ ...formData, commentAr: e.target.value })
                  }
                  className="w-full min-h-[110px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white placeholder:text-white/40
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30"
                />
              </div>

              {/* comment en */}
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-white/70 mb-1">
                  Comment EN
                </label>
                <textarea
                  placeholder="Write comment in English..."
                  value={formData.commentEn}
                  onChange={(e) =>
                    setFormData({ ...formData, commentEn: e.target.value })
                  }
                  className="w-full min-h-[110px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-sm text-white placeholder:text-white/40
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/30"
                />
              </div>
            </div>

            {/* footer */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-bold text-white/85 hover:bg-white/[0.08] transition"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-2xl bg-[var(--main-color)] px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-[var(--secondary-color-2)] transition"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}