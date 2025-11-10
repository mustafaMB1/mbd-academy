import { api } from "./apiClient";


export const categorySrvis ={
    // get all
    async getAll () {
        const res = await api.get('/categories')
        return res.data.data
    },


    // get one
    async getOne (id) {
       const res = await api.get(`/categories/${id}`)
       return res.data
    },

    // update one
    async updateOne (id , data) {
        const res = await api.put(`/categories/${id}`,data)
        return res.data
    },

    // create one
    async createOne (data) {
       const res = await api.post('/categories' , data)
       return res.data
    },

    // delete one
    async deleteOne (id) {
         await api.delete(`/categories/${id}`)
    }
}