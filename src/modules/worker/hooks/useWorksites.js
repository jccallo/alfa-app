import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'

export const useWorksites = () => {
   const [worksites, setWorksites] = useState([])

   const getWorksites = async () => {
      try {
         const response = await Api.get(`/worksites?page=1&per_page=1000`)
         setWorksites(response.data.data)
      } catch (err) {
         toast.error('Error al obtener zonas')
      }
   }

   return {
      worksites,
      getWorksites,
   }
}