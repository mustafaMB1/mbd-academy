import { api } from "./apiClient";


export const levelsSrvis ={
    // get all
    async getAll () {
        const res = await api.get('/levels')
        return res.data.data
    },


    // get one
    async getOne (id) {
       const res = await api.get(`/levels/${id}`)
       return res.data
    },

    // update one
    async updateOne (id , data) {
        const res = await api.put(`/levels/${id}`,data)
        return res.data
    },

    // create one
    async createOne (data) {
       const res = await api.post('/levels' , data)
       return res.data
    },

    // delete one
    async deleteOne (id) {
         await api.delete(`/levels/${id}`)
    }
}