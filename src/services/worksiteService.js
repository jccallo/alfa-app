import { Api } from '../http'

export const worksiteService = {
   index: (params = {}) => Api.get(`/worksites`, { params }),
}
