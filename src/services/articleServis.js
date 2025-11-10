import { api } from "./apiClient";


export const articleServis = {
    //get all 
    async getAll () {
        const res = await api.get('/articles')
        return res.data.data
    },


    //get one
    async getOne (id){
        const res = await api.get(`/articles/${id}`)
        return res.data
    },

    //create one
    async createOne (data) {
        const token = localStorage.getItem("token"); 
        const res = await api.post('/articles' , data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return res.data.data
    },


    // update one
   async updateOne(id , data) {
    const token = localStorage.getItem("token"); 
    const res = await api.put(`/articles/${id}` , data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return res.data.data
   },


//    update published status
async updatePublishidStatus (id , data) {
    const token = localStorage.getItem("token"); 
   const res = await api.patch(`/articles/${id}/publish`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
   return res.data.data
},


//    delete one

   async deleteOne(id) {
    const token = localStorage.getItem("token"); 
    const res = await api.delete(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return res.data.data
   }
}