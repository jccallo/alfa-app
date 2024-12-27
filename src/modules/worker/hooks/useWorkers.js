import { workerService } from '../../../services/workerService'
import { useHttpStore } from '../../../store'
import { useIndexStore } from '../store'

export const useWorkers = () => {
   const { toFormData } = useHttpStore()
   const { setWorkerState } = useIndexStore()

   const storeWorker = async (data) => {
      if (data.images.length > 0) {
         await workerService.storeWithAvatar(toFormData(data))
      } else {
         await workerService.store(data)
      }
   }

   const editWorker = async (id, data) => {
      if (data.images.length > 0) {
         return await workerService.updateWithAvatar(id, toFormData(data))
      } else {
         return await workerService.update(id, data)
      }
   }

   const getWorkerById = async (id) => {
      await workerService.show(id).then((response) => setWorkerState(response.data.data))
   }

   return {
      storeWorker,
      editWorker,
      getWorkerById,
   }
}
