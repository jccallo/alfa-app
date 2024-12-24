import { Api } from "../http";

export const medicalCareService = {
   store: (data) => Api.post('/medical-care', data),
   show: (id) => Api.get(`/medical-care/${id}`),
   update: (id, data) => Api.put(`/medical-care/${id}`, data),
   delete: (id) => Api.delete(`/medical-care/${id}`),
}
