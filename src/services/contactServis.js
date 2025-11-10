import { api } from "./apiClient";


export const contactSrvis ={
    // get all
    async getAll () {
        const res = await api.get('/contact')
        return res.data
    },


    // get one
    async getOne (id) {
       const res = await api.get(`/contact/${id}`)
       return res.data
    },

    // mark read
    async markReade (id , data) {
        const res = await api.patch(`/contact/${id}/mark-read`,data)
        return res.data
    },

    // create one
    async createOne (data) {
       const res = await api.post('/contact' , data)
       return res.data
    },

    // delete one
    async deleteOne (id) {
         await api.delete(`/contact/${id}`)
    }
}