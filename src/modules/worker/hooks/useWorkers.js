import { workerService } from '../../../services/workerService'
import { useHttpStore } from '../../../store'
import { useIndexStore } from '../store'

export const useWorkers = () => {
   const { toFormData }  = useHttpStore()
   const { setWorkerState }  = useIndexStore()

   const storeWorker = async (data, selectedFile) => {
      if (selectedFile) {
         await workerService.storeWithAvatar(toFormData({ ...data, 'images[]': selectedFile }))
      } else {
         await workerService.store(data)
      }
   }

   const editWorker = async (id, data, selectedFile) => {
      if (selectedFile) {
         return await workerService.updateWithAvatar(id, toFormData({ id, ...data, 'images[]': selectedFile }))
      } else {
         return await workerService.update(id, { id, ...data })
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
