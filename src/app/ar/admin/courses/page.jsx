"use client";

import { useEffect, useState } from "react";
import { coursesServis } from "@/services/coursesServis";
import { categorySrvis } from "@/services/categoryServis";
import { trainersSrvis } from "@/services/trainersServis";
import { levelsSrvis } from "@/services/levelsServis";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // ✅ حالة الفلترة

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

  // ✅ تحميل البيانات من السيرفر
  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesData, categoriesData, trainersData, levelsData] =
          await Promise.all([
            coursesServis.getAll(),
            categorySrvis.getAll(),
            trainersSrvis.getAll(),
            levelsSrvis.getAll(),
          ]);

        setCourses(coursesData || []);
        console.log(coursesData);
        setCategories(categoriesData || []);
        setTrainers(trainersData || []);
        setLevels(levelsData || []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // ✅ تغيير الحقول
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ تعديل syllabus
  const handleSyllabusChange = (e, lang, idx) => {
    const arr = [...formData[lang]];
    arr[idx] = e.target.value;
    setFormData({ ...formData, [lang]: arr });
  };

  // ✅ إضافة syllabus جديد
  const addSyllabusField = (lang) => {
    setFormData({ ...formData, [lang]: [...formData[lang], ""] });
  };

  // ✅ إرسال / تعديل كورس
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        categoryId: Number(formData.categoryId),
        levelId: Number(formData.levelId),
        price: Number(formData.price),
      };

      if (editingId) {
        await coursesServis.updateOne(editingId, payload);
        setEditingId(null);
      } else {
        await coursesServis.createOne(payload);
      }

      const refreshed = await coursesServis.getAll();
      setCourses(refreshed);
      resetForm();
    } catch (err) {
      console.error("❌ Error saving course:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ تعديل كورس موجود
  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      nameEn: course.nameEn,
      nameAr: course.nameAr,
      descriptionEn: course.descriptionEn,
      descriptionAr: course.descriptionAr,
      categoryId: course.categoryId,
      trainerId: course.trainerId,
      levelId: course.levelId,
      published: course.published,
      price: course.price,
      url: course.url,
      syllabusEn: course.syllabusEn || [""],
      syllabusAr: course.syllabusAr || [""],
    });
  };

  // ✅ حذف كورس
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكورس؟")) return;
    try {
      await coursesServis.deleteOne(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("❌ Error deleting course:", error);
    }
  };

  // ✅ إعادة تعيين النموذج
  const resetForm = () => {
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

  // ✅ تطبيق الفلترة
  const filteredCourses = courses.filter((course) => {
    if (filterStatus === "active") return course.published === true;
    if (filterStatus === "inactive") return course.published === false;
    return true;
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">إدارة الكورسات</h2>

      {/* فورم الإضافة / التعديل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nameEn"
            placeholder="Course Name (EN)"
            value={formData.nameEn}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />
          <input
            name="nameAr"
            placeholder="اسم الدورة (عربي)"
            value={formData.nameAr}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />
          <input
            name="descriptionEn"
            placeholder="Description (EN)"
            value={formData.descriptionEn}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            name="descriptionAr"
            placeholder="الوصف (عربي)"
            value={formData.descriptionAr}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameAr}
              </option>
            ))}
          </select>

          <select
            name="trainerId"
            value={formData.trainerId}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">اختر المدرب</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nameAr}
              </option>
            ))}
          </select>

          <select
            name="levelId"
            value={formData.levelId}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">اختر المستوى</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.nameAr}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              name="published"
              type="checkbox"
              checked={formData.published}
              onChange={handleChange}
            />
            <span>منشور</span>
          </label>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </div>

        {/* Syllabus EN */}
        <div>
          <h3 className="font-semibold mb-2">Syllabus (EN)</h3>
          {formData.syllabusEn.map((_, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Topic (EN) #${idx + 1}`}
              value={formData.syllabusEn[idx]}
              onChange={(e) => handleSyllabusChange(e, "syllabusEn", idx)}
              className="border p-2 rounded-md mb-2 w-full"
            />
          ))}
          <button
            type="button"
            onClick={() => addSyllabusField("syllabusEn")}
            className="text-[var(--main-color)] hover:underline"
          >
            + Add topic (EN)
          </button>
        </div>

        {/* Syllabus AR */}
        <div>
          <h3 className="font-semibold mb-2">Syllabus (AR)</h3>
          {formData.syllabusAr.map((_, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`موضوع #${idx + 1}`}
              value={formData.syllabusAr[idx]}
              onChange={(e) => handleSyllabusChange(e, "syllabusAr", idx)}
              className="border p-2 rounded-md mb-2 w-full"
            />
          ))}
          <button
            type="button"
            onClick={() => addSyllabusField("syllabusAr")}
            className="text-[var(--main-color)] hover:underline"
          >
            + أضف موضوع (عربي)
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--main-color)] text-white py-3 rounded-md w-full font-semibold hover:bg-[var(--secondary-color-1)] transition"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
            ? "تحديث الدورة"
            : "إضافة دورة جديدة"}
        </button>
      </form>

      {/* ✅ فلترة الكورسات */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-md font-medium ${
            filterStatus === "all"
              ? "bg-[var(--main-color)] text-white"
              : "bg-gray-200"
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilterStatus("active")}
          className={`px-4 py-2 rounded-md font-medium ${
            filterStatus === "active"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          النشطة
        </button>
        <button
          onClick={() => setFilterStatus("inactive")}
          className={`px-4 py-2 rounded-md font-medium ${
            filterStatus === "inactive"
              ? "bg-gray-500 text-white"
              : "bg-gray-200"
          }`}
        >
          غير المنشورة
        </button>
      </div>

      {/* ✅ جدول عرض الكورسات */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[var(--main-color)] text-white">
          <tr>
            <th className="py-2 px-4 text-right">العنوان (EN)</th>
            <th className="py-2 px-4 text-right">العنوان (AR)</th>
            <th className="py-2 px-4 text-right">التصنيف</th>
            <th className="py-2 px-4 text-right">المدرب</th>
            <th className="py-2 px-4 text-right">السعر</th>
            <th className="py-2 px-4 text-right">الحالة</th>
            <th className="py-2 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {filteredCourses.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                لا توجد كورسات حالياً
              </td>
            </tr>
          ) : (
            filteredCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{course.nameEn}</td>
                <td className="py-2 px-4">{course.nameAr}</td>
                <td className="py-2 px-4">
                  {categories.find((c) => c.id === course.categoryId)?.nameAr}
                </td>
                <td className="py-2 px-4">
                  {trainers.find((t) => t.id === course.trainerId)?.nameAr}
                </td>
                <td className="py-2 px-4">{course.price}</td>

                {/* ✅ حالة النشر */}
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={async () => {
                      try {
                        const updated = {
                          ...course,
                          published: !course.published,
                        };
                        await coursesServis.updateOne(course.id, {
                          published: updated.published,
                        });
                        setCourses((prev) =>
                          prev.map((c) =>
                            c.id === course.id
                              ? { ...c, published: updated.published }
                              : c
                          )
                        );
                      } catch (err) {
                        console.error("❌ Error updating status:", err);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-white font-medium ${
                      course.published
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  >
                    {course.published ? "نشط" : "غير منشور"}
                  </button>
                </td>

                {/* ✅ الإجراءات */}
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 mx-1 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 mx-1 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
