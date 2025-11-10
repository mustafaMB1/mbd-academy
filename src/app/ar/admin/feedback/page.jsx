"use client";

import { useEffect, useState } from "react";
import { feedbackSrvis } from "@/services/feedbackServis";
import { coursesServis } from "@/services/coursesServis";
import { FaPlus, FaTrash, FaStar, FaEdit } from "react-icons/fa";

export default function FeedbackDashboardPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // 🔹 لتحديد الكورس
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [formData, setFormData] = useState({
    courseId: "",
    rating: 0,
    commentEn: "",
    commentAr: "",
    email: "",
  });

  // 📦 تحميل قائمة الكورسات فقط بالبداية
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await coursesServis.getAll();
      setCourses(data);
    } catch (err) {
      console.error("❌ Failed to load courses:", err);
    }
  };

  // 🔹 تحميل التقييمات الخاصة بكورس محدد
  const fetchFeedbacks = async (courseId) => {
    if (!courseId) {
      setFeedbacks([]);
      return;
    }
    setLoading(true);
    try {
      const data = await feedbackSrvis.getAllForCourse(courseId);
      setFeedbacks(data);
      console.log(data);
    } catch (err) {
      console.error("❌ Failed to load feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 إنشاء تقييم
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, userId: null };
      await feedbackSrvis.createOne(dataToSend);
      setShowForm(false);
      setFormData({
        courseId: "",
        rating: 0,
        commentEn: "",
        commentAr: "",
        email: "",
      });
      if (selectedCourse) fetchFeedbacks(selectedCourse);
    } catch (err) {
      console.error("❌ Failed to create feedback:", err);
    }
  };

  // 🟡 تعديل تقييم
  const handleEdit = (feedback) => {
    setSelectedFeedback(feedback);
    setFormData({
      courseId: feedback.courseId,
      rating: feedback.rating,
      commentEn: feedback.commentEn || "",
      commentAr: feedback.commentAr || "",
      email: feedback.email,
    });
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await feedbackSrvis.updateOne(selectedFeedback.id, formData);
      setShowEditForm(false);
      setSelectedFeedback(null);
      if (selectedCourse) fetchFeedbacks(selectedCourse);
      alert("✅ تم تعديل التقييم بنجاح");
    } catch (err) {
      console.error("❌ Failed to update feedback:", err);
      alert("فشل التعديل");
    }
  };

  // 🔴 حذف تقييم
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;
    try {
      await feedbackSrvis.deleteOne(id);
      if (selectedCourse) fetchFeedbacks(selectedCourse);
    } catch (err) {
      console.error("❌ Failed to delete feedback:", err);
    }
  };

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--main-color)]">
          إدارة التقييمات
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[var(--main-color)] text-white px-4 py-2 rounded-xl hover:bg-[var(--secondary-color-2)] transition"
        >
          <FaPlus /> إضافة تقييم جديد
        </button>
      </div>

      {/* 🔽 اختيار الكورس */}
      <div className="mb-6">
        <select
          value={selectedCourse}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedCourse(id);
            fetchFeedbacks(id);
          }}
          className="border rounded-lg p-2 w-full sm:w-1/2"
        >
          <option value="">اختر الكورس لعرض تقييماته</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameAr || c.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 جدول التقييمات */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          جاري تحميل التقييمات...
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">التقييم</th>
                <th className="p-4">التعليق (ع)</th>
                <th className="p-4">التعليق (En)</th>
                <th className="p-4">الإيميل</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <tr key={fb.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </td>
                    <td className="p-4">{fb.commentAr || "-"}</td>
                    <td className="p-4">{fb.commentEn || "-"}</td>
                    <td className="p-4">{fb.email || "-"}</td>
                    <td className="p-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(fb)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="تعديل"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(fb.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    لا يوجد تقييمات لهذا الكورس حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 🧾 نافذة إضافة تقييم */}
      {showForm && (
        <FeedbackModal
          title="إضافة تقييم جديد"
          formData={formData}
          setFormData={setFormData}
          courses={courses}
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* ✏️ نافذة تعديل تقييم */}
      {showEditForm && (
        <FeedbackModal
          title="تعديل التقييم"
          formData={formData}
          setFormData={setFormData}
          courses={courses}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleUpdate}
        />
      )}
    </section>
  );
}

// 🧩 مكون النافذة المنبثقة (إضافة / تعديل)
function FeedbackModal({ title, formData, setFormData, courses, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-[var(--main-color)]">
          {title}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <select
            value={formData.courseId}
            onChange={(e) =>
              setFormData({ ...formData, courseId: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">اختر الكورس</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.nameAr || course.nameEn}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: +e.target.value })
            }
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            required
          />

          <textarea
            placeholder="Comment (Ar)"
            value={formData.commentAr || ""}
            onChange={(e) =>
              setFormData({ ...formData, commentAr: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />

          <textarea
            placeholder="Comment (En)"
            value={formData.commentEn || ""}
            onChange={(e) =>
              setFormData({ ...formData, commentEn: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[var(--main-color)] text-white hover:bg-[var(--secondary-color-2)]"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
