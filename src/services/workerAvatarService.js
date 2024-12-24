import { Api } from "../http";

export const workerAvatarService = {
   update: (id, data) => Api.post(`/workers/${id}/avatars`, data),
}