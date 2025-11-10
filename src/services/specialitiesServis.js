import { api } from "./apiClient";


export const specialitisSrvis ={
    // get all
    async getAll () {
        const res = await api.get('/specialities')
        return res.data
    },


    // get one
    async getOne (id) {
       const res = await api.get(`/specialities/${id}`)
       return res.data
    },
 
    // update one
    async updateOne (id , data) {
        const token = localStorage.getItem("token"); 
        const res = await api.put(`/specialities/${id}`,data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return res.data
    },

    // create one
    async createOne (data) {
        const token = localStorage.getItem("token"); 
       const res = await api.post('/specialities' , data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
       return res.data
    },

    // delete one
    async deleteOne (id) {
        const token = localStorage.getItem("token"); 
         await api.delete(`/specialities/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    }
}