import { api } from "./apiClient";

export const feedbackSrvis = {
  // ✅ get all feedback for a specific course
  async getAllForCourse(courseId) {
    const res = await api.get(`/feedback/course/${courseId}`);
    return res.data.data;
  },

  // ✅ get all feedback for a specific user
  async getAllForUser(userId) {
    const res = await api.get(`/feedback/user/${userId}`);
    return res.data.data;
  },

  // ✅ get one feedback
  async getOne(id) {
    const res = await api.get(`/feedback/${id}`);
    return res.data;
  },

  // 🟡 update feedback (requires token, use in client components)
  async updateOne(id, data) {
    const token = localStorage.getItem("token");
    const res = await api.patch(`/feedback/${Number(id)}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  // 🟡 create feedback (requires token, use in client components)
  async createOne(data) {
    const token = localStorage.getItem("token");
    const res = await api.post("/feedback", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  // 🟡 delete feedback (requires token)
  async deleteOne(id) {
    const token = localStorage.getItem("token");
    await api.delete(`/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
