import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'

export const useTypesMedicalCare = () => {
   const [typesMedicalCare, setTypesMedicalCare] = useState([])

   const getTypesMedicalCare = async () => {
      try {
         const response = await Api.get(`/types-medical-care?page=1&per_page=1000`)
         setTypesMedicalCare(response.data.data)
      } catch (err) {
         toast.error('Error al obtener contingencias')
      }
   }

   return {
      typesMedicalCare,
      getTypesMedicalCare,
   }
}