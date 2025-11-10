import { api } from "./apiClient";


export const trainersSrvis ={
    // get all
    async getAll () {
        const res = await api.get('/trainers')
        return res.data.data
    },

 
    // get one
    async getOne (id) {
       const res = await api.get(`/trainers/${id}`)
       return res.data
    },

    // update one
    async updateOne (id , data) {
        const token = localStorage.getItem("token");
        const res = await api.put(`/trainers/${id}`,data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return res.data
    },


    // update and uploade photo
    async updatePhoto(id, file) {
        const token = localStorage.getItem("token");
    
        // تأكد إنك عم تمرر file مباشرة من input.files[0]
    
    
        const res = await api.post(`/trainers/${id}/photo`,file , {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
    
        return res.data;
      },



        // update and uploade active status
        async updateStatus (id , data) {
            const token = localStorage.getItem("token");
            const res = await api.patch(`/trainers/${id}/toggle-active`,data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            return res.data
        },



    // create one
    async createOne (data) {
        const token = localStorage.getItem("token");
       const res = await api.post('/trainers' , data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
       return res.data
    },

    // delete one
    async deleteOne (id) {
        const token = localStorage.getItem("token");
         await api.delete(`/trainers/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    }
}