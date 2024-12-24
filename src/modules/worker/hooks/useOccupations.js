import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'

export const useOccupations = () => {
   const [occupations, setOccupations] = useState([])

   const getOccupations = async () => {
      try {
         const response = await Api.get(`/occupations?page=1&per_page=1000`)
         setOccupations(response.data.data)
      } catch (err) {
         toast.error('Error al obtener ocupaciones')
      }
   }

   return {
      occupations,
      getOccupations,
   }
}
