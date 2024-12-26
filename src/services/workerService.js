import { Api } from '../http'

export const workerService = {
   storeWithAvatar: (data) => Api.post(`/workers/store-with-avatar`, data),
   updateWithAvatar: (id, data) => Api.post(`/workers/${id}/update-with-avatar`, data),

   showByCode: (code) => Api.get(`/workers/show-by-code/${code}`),

   store: (data) => Api.post(`/workers`, data),
   index: () => Api.get(`/workers`),
   show: (id) => Api.get(`/workers/${id}`),
   update: (id, data) => Api.put(`/workers/${id}`, data),
   delete: (id) => Api.delete(`/workers/${id}`),
}
