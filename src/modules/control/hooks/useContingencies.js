import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'

export const useContingencies = () => {
   const [contingencies, setContingencies] = useState([])

   const getContingencies = async () => {
      try {
         const response = await Api.get(`/contingencies?page=1&per_page=1000`)
         setContingencies(response.data.data)
      } catch (err) {
         toast.error('Error al obtener contingencias')
      }
   }

   return {
      contingencies,
      getContingencies,
   }
}
