"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    tags: [""],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const apiUrl = `${baseUrl}/categories`

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // بعض الـ APIs تضع النتائج في `resp.data` أو في `resp.data.data`
      const data = resp.data.data ?? resp.data;
      setCategories(data);
    } catch (err) {
      console.error("Unable to fetch categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (e, idx) => {
    const arr = [...formData.tags];
    arr[idx] = e.target.value;
    setFormData({ ...formData, tags: arr });
  };

  const addTagField = () => {
    setFormData({ ...formData, tags: [...formData.tags, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        // تعديل (PUT)
        await axios.put(`${apiUrl}/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditingId(null);
      } else {
        // إضافة (POST)
        await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setFormData({
        nameEn: "",
        nameAr: "",
        descriptionEn: "",
        descriptionAr: "",
        tags: [""],
      });
      await fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      nameEn: cat.nameEn,
      nameAr: cat.nameAr,
      descriptionEn: cat.descriptionEn,
      descriptionAr: cat.descriptionAr,
      tags: cat.tags?.length ? cat.tags : [""],
    });
  };

  const handleDelete = async (catId) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/${catId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">إدارة الفئات</h2>

      {/* فورم إضافة / تعديل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nameEn"
            placeholder="Name (EN)"
            value={formData.nameEn}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            name="nameAr"
            placeholder="الاسم (عربي)"
            value={formData.nameAr}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
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
        </div>

        <div>
          <h3 className="font-semibold">Tags</h3>
          {formData.tags.map((tag, idx) => (
            <input
              key={`tag-${idx}`}
              type="text"
              placeholder={`Tag #${idx + 1}`}
              value={tag}
              onChange={(e) => handleTagChange(e, idx)}
              className="border p-2 rounded-md mb-2 w-full"
            />
          ))}
          <button
            type="button"
            onClick={addTagField}
            className="text-[var(--main-color)] hover:underline"
          >
            + إضافة وسم
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--main-color)] text-white py-3 rounded-md w-full font-semibold hover:bg-[var(--secondary-color-1)] transition"
        >
          {loading ? "جاري الحفظ..." : editingId ? "تحديث الفئة" : "إضافة فئة جديدة"}
        </button>
      </form>

      {/* جدول الفئات */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[var(--main-color)] text-white">
          <tr>
            <th className="py-2 px-4 text-right">الاسم (EN)</th>
            <th className="py-2 px-4 text-right">الاسم (AR)</th>
            <th className="py-2 px-4 text-right">الوصف (EN)</th>
            <th className="py-2 px-4 text-right">الوصف (AR)</th>
            <th className="py-2 px-4 text-right">الوسوم</th>
            <th className="py-2 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                لا توجد فئات حالياً
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{cat.nameEn}</td>
                <td className="py-2 px-4">{cat.nameAr}</td>
                <td className="py-2 px-4">{cat.descriptionEn}</td>
                <td className="py-2 px-4">{cat.descriptionAr}</td>
                <td className="py-2 px-4">
                  {cat.tags?.join(", ")}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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
