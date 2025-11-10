"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
export default function LevelsPage() {
  const apiUrl = `${baseUrl}/levels`;

  const [levels, setLevels] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = resp.data.data ?? resp.data;
      setLevels(data);
    } catch (err) {
      console.error("Unable to fetch levels:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditingId(null);
      } else {
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
      });
      await fetchLevels();
    } catch (err) {
      console.error("Error saving level:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lvl) => {
    setEditingId(lvl.id);
    setFormData({
      nameEn: lvl.nameEn,
      nameAr: lvl.nameAr,
      descriptionEn: lvl.descriptionEn,
      descriptionAr: lvl.descriptionAr,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستوى؟")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchLevels();
    } catch (err) {
      console.error("Error deleting level:", err);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">إدارة المستويات</h2>

      {/* فورم الإضافة / التعديل */}
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
            required
            className="border p-2 rounded-md"
          />
          <input
            name="nameAr"
            placeholder="الاسم (عربي)"
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--main-color)] text-white py-3 rounded-md w-full font-semibold hover:bg-[var(--secondary-color-1)] transition"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
            ? "تحديث المستوى"
            : "إضافة مستوى جديد"}
        </button>
      </form>

      {/* جدول المستويات */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[var(--main-color)] text-white">
          <tr>
            <th className="py-2 px-4 text-right">الاسم (EN)</th>
            <th className="py-2 px-4 text-right">الاسم (AR)</th>
            <th className="py-2 px-4 text-right">الوصف (EN)</th>
            <th className="py-2 px-4 text-right">الوصف (AR)</th>
            <th className="py-2 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {levels.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                لا توجد مستويات حالياً
              </td>
            </tr>
          ) : (
            levels.map((lvl) => (
              <tr key={lvl.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{lvl.nameEn}</td>
                <td className="py-2 px-4">{lvl.nameAr}</td>
                <td className="py-2 px-4">{lvl.descriptionEn}</td>
                <td className="py-2 px-4">{lvl.descriptionAr}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(lvl)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(lvl.id)}
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
