import { Api } from "../http"

export const workerMedicalCareService = {
   treatedWorkers: (params = {}) => Api.get(`/worker-medical-care/treated-workers`, { params }),
   careHistory: (params = {}) => Api.get(`/worker-medical-care/care-history`, { params }),
}
