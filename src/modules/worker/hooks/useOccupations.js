import { occupationService } from '../../../services'
import { useIndexStore } from '../store'

export const useOccupations = () => {
   const { setOcupationsState } = useIndexStore()

   const getAllOccupations = async () => {
      await occupationService.index({ page: 1, per_page: 1000 }).then((response) => setOcupationsState(response.data.data))
   }

   return {
      getAllOccupations,
   }
}
