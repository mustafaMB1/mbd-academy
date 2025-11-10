"use client";

import { useEffect, useState } from "react";
import { trainersSrvis } from "@/services/trainersServis";
import { specialitisSrvis } from "@/services/specialitiesServis";
import Image from "next/image";
import defImage from "./default.png";

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
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ تحميل البيانات
  useEffect(() => {
    fetchTrainers();
    fetchSpecialities();
  }, []);

  const fetchTrainers = async () => {
    try {
      const data = await trainersSrvis.getAll();
      setTrainers(data);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const data = await specialitisSrvis.getAll();
      setSpecialities(data);
    } catch (err) {
      console.error("Error fetching specialities:", err);
    }
  };

  // ✅ تغيّر القيم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        setEditingId(null);
      } else {
        await trainersSrvis.createOne(payload);
      }

      resetForm();
      await fetchTrainers();
    } catch (err) {
      console.error("Error saving trainer:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ تعديل
  const handleEdit = (trainer) => {
    setEditingId(trainer.id);
    setFormData({
      nameEn: trainer.nameEn,
      nameAr: trainer.nameAr,
      bioEn: trainer.bioEn,
      bioAr: trainer.bioAr,
      specialityId: trainer.specialityId || "",
    });
  };

  // ✅ حذف
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المدرّب؟")) return;
    try {
      await trainersSrvis.deleteOne(id);
      await fetchTrainers();
    } catch (err) {
      console.error("Error deleting trainer:", err);
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
    }
  };

  // ✅ رفع صورة
  const handlePhotoChange = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await trainersSrvis.updatePhoto(id, formData);
      setTrainers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, imageUrl: res.photoUrl } : t))
      );
    } catch (err) {
      console.error("Error updating photo:", err);
    }
  };

  // ✅ إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      nameEn: "",
      nameAr: "",
      bioEn: "",
      bioAr: "",
      specialityId: "",
    });
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">إدارة المدربين</h2>

      {/* ✅ نموذج الإضافة / التعديل */}
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
            name="bioEn"
            placeholder="Description (EN)"
            value={formData.bioEn}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            name="bioAr"
            placeholder="الوصف (عربي)"
            value={formData.bioAr}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          {/* ✅ اختيار الاختصاص */}
          <select
            name="specialityId"
            value={formData.specialityId}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          >
            <option value="">اختر الاختصاص</option>
            {specialities.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.nameAr}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--main-color)] text-white py-3 rounded-md w-full font-semibold hover:bg-[var(--secondary-color-1)] transition"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
            ? "تحديث بيانات المدرب"
            : "إضافة مدرب جديد"}
        </button>
      </form>

      {/* ✅ جدول المدربين */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[var(--main-color)] text-white">
          <tr>
            <th className="py-2 px-4 text-right">الصورة</th>
            <th className="py-2 px-4 text-right">الاسم (EN)</th>
            <th className="py-2 px-4 text-right">الاسم (AR)</th>
            <th className="py-2 px-4 text-right">الوصف (EN)</th>
            <th className="py-2 px-4 text-right">الوصف (AR)</th>
            <th className="py-2 px-4 text-right">الاختصاص</th>
            <th className="py-2 px-4 text-center">الحالة</th>
            <th className="py-2 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                لا يوجد مدربون حالياً
              </td>
            </tr>
          ) : (
            trainers.map((trainer) => (
              <tr key={trainer.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-center">
                  <Image
                    src={trainer.imageUrl || defImage}
                    alt={trainer.nameAr}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover mx-auto rounded-full"
                  />
                  <input
                    type="file"
                    className="mt-2 text-sm"
                    onChange={(e) => handlePhotoChange(trainer.id, e)}
                  />
                </td>
                <td className="py-2 px-4">{trainer.nameEn}</td>
                <td className="py-2 px-4">{trainer.nameAr}</td>
                <td className="py-2 px-4">{trainer.bioEn}</td>
                <td className="py-2 px-4">{trainer.bioAr}</td>
                <td className="py-2 px-4">
                  {specialities.find((s) => s.id === trainer.specialityId)
                    ?.nameAr || "—"}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() =>
                      handleToggleActive(trainer.id, trainer.active)
                    }
                    className={`px-3 py-1 rounded ${
                      trainer.active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {trainer.active ? "نشط" : "غير نشط"}
                  </button>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(trainer)}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(trainer.id)}
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
