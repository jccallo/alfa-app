import { useState } from "react"
import toast from "react-hot-toast"
import { Api } from "../../../http"

export const useMedicalCare = () => {
   const [errors, setErrors] = useState({})

   const storeMedicalCare = async (data) => {
      console.log('data', data)
      try {
         const response = await Api.post(`/medical-care`, data)
         if (response.data.data) toast.success('Control Médico registrado correctamente')
         setErrors({})
      } catch (error) {
         toast.error('Error al registrar control medico')
      }
   }

   return {
      errors,
      storeMedicalCare,
   }
}
