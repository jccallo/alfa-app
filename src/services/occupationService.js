import { Api } from '../http'

export const occupationService = {
   index: (params = {}) => Api.get(`/occupations`, { params }),
}
