import { worksiteService } from '../../../services'
import { useIndexStore } from '../store'

export const useWorksites = () => {
   const { setWorksitesState } = useIndexStore()

   const getAllWorksites = async () => {
      await worksiteService.index({ page: 1, per_page: 1000 }).then((response) => setWorksitesState(response.data.data))
   }

   return {
      getAllWorksites,
   }
}
