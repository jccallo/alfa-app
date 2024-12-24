import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'

export const useCareCenters = () => {
   const [careCenters, setCareCenters] = useState([])

   const getCareCenters = async () => {
      try {
         const response = await Api.get(`/care-centers?page=1&per_page=1000`)
         setCareCenters(response.data.data)
      } catch (err) {
         toast.error('Error al obtener lugares de atencion')
      }
   }

   return {
      careCenters,
      getCareCenters,
   }
}