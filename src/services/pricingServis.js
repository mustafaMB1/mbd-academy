import { api } from "./apiClient";


export const pricingSrvis ={
    // get all
    async getAll () {
        const res = await api.get('/pricing')
        return res.data
    },


    // get one
    async getOne (id) {
       const res = await api.get(`/pricing/${id}`)
       return res.data
    },

    // update one
    async updateOne (id , data) {
        const res = await api.put(`/pricing/${id}`,data)
        return res.data
    },


        // toggle active status
        async updateToggle (id , data) {
            const res = await api.put(`/pricing/${id}/toggle-active`,data)
            return res.data
        },

    // create one
    async createOne (data) {
       const res = await api.post('/pricing' , data)
       return res.data
    },

    // delete one
    async deleteOne (id) {
         await api.delete(`/pricing/${id}`)
    }
}