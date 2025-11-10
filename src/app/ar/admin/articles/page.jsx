"use client";

import { useEffect, useState } from "react";
import { categorySrvis } from "@/services/categoryServis";
import { trainersSrvis } from "@/services/trainersServis";
import { articleServis } from "@/services/articleServis";

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

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // جلب جميع البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchTrainers();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articleServis.getAll();
      const list = data.data ?? data; // بعض الـ endpoints يعيدون داخل data.data
      setArticles(list);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categorySrvis.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchTrainers = async () => {
    try {
      const data = await trainersSrvis.getAll();
      setTrainers(data);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await articleServis.updateOne(editingId, formData);
      } else {
        await articleServis.createOne(formData);
      }
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
      setEditingId(null);
      await fetchArticles();
    } catch (err) {
      console.error("Error saving article:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      nameEn: art.nameEn,
      nameAr: art.nameAr,
      descriptionEn: art.descriptionEn,
      descriptionAr: art.descriptionAr,
      contentEn: art.contentEn,
      contentAr: art.contentAr,
      categoryId: art.categoryId,
      trainerId: art.trainerId,
      published: art.published,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    try {
      await articleServis.deleteOne(id);
      await fetchArticles();
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  const togglePublish = async (id) => {
    try {
      await articleServis.updatePublishidStatus(id);
      await fetchArticles();
    } catch (err) {
      console.error("Error updating publish status:", err);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">إدارة المقالات</h2>

      {/* فورم إضافة / تعديل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nameEn"
            placeholder="Title (EN)"
            value={formData.nameEn}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />
          <input
            name="nameAr"
            placeholder="العنوان (عربي)"
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

          <textarea
            name="contentEn"
            placeholder="Content (EN) HTML"
            value={formData.contentEn}
            onChange={handleChange}
            className="border p-2 rounded-md col-span-2"
          />
          <textarea
            name="contentAr"
            placeholder="المحتوى (عربي) HTML"
            value={formData.contentAr}
            onChange={handleChange}
            className="border p-2 rounded-md col-span-2"
          />

          {/* اختيار الفئة */}
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">اختر الفئة</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameAr} / {cat.nameEn}
              </option>
            ))}
          </select>

          {/* اختيار المدرب */}
          <select
            name="trainerId"
            value={formData.trainerId}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">اختر المدرب</option>
            {trainers.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tr.nameAr} / {tr.nameEn}
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
            <span>نشر</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--main-color)] text-white py-3 rounded-md w-full font-semibold hover:bg-[var(--secondary-color-1)] transition"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
            ? "تحديث المقال"
            : "إضافة مقال جديد"}
        </button>
      </form>

      {/* جدول المقالات */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[var(--main-color)] text-white">
          <tr>
            <th className="py-2 px-4 text-right">العنوان (EN)</th>
            <th className="py-2 px-4 text-right">العنوان (AR)</th>
            <th className="py-2 px-4 text-right">الفئة</th>
            <th className="py-2 px-4 text-right">المدرب</th>
            <th className="py-2 px-4 text-center">الحالة</th>
            <th className="py-2 px-4 text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                لا توجد مقالات حالياً
              </td>
            </tr>
          ) : (
            articles.map((art) => (
              <tr key={art.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{art.nameEn}</td>
                <td className="py-2 px-4">{art.nameAr}</td>
                <td className="py-2 px-4">
                  {
                    categories.find((c) => c.id === art.categoryId)?.nameAr ||
                    art.categoryId
                  }
                </td>
                <td className="py-2 px-4">
                  {
                    trainers.find((t) => t.id === art.trainerId)?.nameAr ||
                    art.trainerId
                  }
                </td>
                <td className="py-2 px-4 text-center">
                  {art.published ? "منشور" : "غير منشور"}{" "}
                  <button
                    onClick={() => togglePublish(art.id)}
                    className="ml-2 text-sm text-blue-600 hover:underline"
                  >
                    {art.published ? "إلغاء النشر" : "نشر"}
                  </button>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(art)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(art.id)}
                    className="text-red-600 hover:underline"
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
