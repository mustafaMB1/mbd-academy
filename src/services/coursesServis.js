import { api } from "./apiClient";

export const coursesServis ={
    // get all courses
    async getAll(){
        const res = await api.get('/courses')
        return res.data.data
    },  

    //get one course
    async getOne(id) {
        const res  = await api.get(`/courses/${id}`)
        return res.data
    },

// create Course
async createOne(data) {
    const token = localStorage.getItem("token"); // أو من الكوكيز حسب التطبيق
    console.log(token);
    const res = await api.post("/courses", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  

    // update course

    async updateOne (id,data){
      const token = localStorage.getItem("token");
        const res =await api.patch(`/courses/${id}` , data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return res.data
    },


    //delete course

    async deleteOne (id){
      const token = localStorage.getItem("token");
        const res = await api.delete(`/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return res.data
    }

}