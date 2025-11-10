"use client";

import { useEffect, useState } from "react";
import { specialitisSrvis } from "@/services/specialitiesServis";

export default function SpecialitiesPage() {
  const [specialities, setSpecialities] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const fetchSpecialities = async () => {
    try {
      const data = await specialitisSrvis.getAll();
      setSpecialities(data);
    } catch (err) {
      console.error("Unable to fetch specialities:", err);
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
      if (editingId) {
        await specialitisSrvis.updateOne(editingId, formData);
        setEditingId(null);
      } else {
        await specialitisSrvis.createOne(formData);
      }
      setFormData({
        nameEn: "",
        nameAr: "",
        descriptionEn: "",
        descriptionAr: "",
      });
      await fetchSpecialities();
    } catch (err) {
      console.error("Error saving speciality:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      nameEn: item.nameEn,
      nameAr: item.nameAr,
      descriptionEn: item.descriptionEn,
      descriptionAr: item.descriptionAr,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الاختصاص؟")) return;
    try {
      await specialitisSrvis.deleteOne(id);
      await fetchSpecialities();
    } catch (err) {
      console.error("Error deleting speciality:", err);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">إدارة الاختصاصات</h2>

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
            ? "تحديث الاختصاص"
            : "إضافة اختصاص جديد"}
        </button>
      </form>

      {/* جدول الاختصاصات */}
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
          {specialities.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                لا توجد اختصاصات حالياً
              </td>
            </tr>
          ) : (
            specialities.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.nameEn}</td>
                <td className="py-2 px-4">{item.nameAr}</td>
                <td className="py-2 px-4">{item.descriptionEn}</td>
                <td className="py-2 px-4">{item.descriptionAr}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
