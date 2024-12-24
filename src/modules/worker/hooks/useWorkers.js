import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'
import { useForm } from '../../../hooks'
import { useImageUpload } from './useImageUpload'
import { workerService } from '../../../services/workerService'

const initialForm = {
   codigo: '',
   apellidos_nombres: '',
   dni: '',
   fecha_nacimiento: '',
   fecha_ingreso: '',
   occupation_id: '',
   worksite_id: '',
}

const workerInterface = {
   codigo: '',
   apellidos_nombres: '',
   dni: '',
   fecha_nacimiento: '',
   fecha_ingreso: '',
   occupation: {
      id: '',
      nombre: '',
   },
   worksite: {
      id: '',
      nombre: '',
   },
}

export const useWorkers = () => {
   const [errors, setErrors] = useState({})
   const [worker, setWorker] = useState(workerInterface)

   const storeForm = useForm(initialForm)
   const editForm = useForm(initialForm)
   const { setSelectedFile, handleFileChange, selectedFile, preview } = useImageUpload()

   const storeWorker = async (data) => {
      try {
         let response = null
         console.log('formatData({id, ...data})', formatData({...data, selectedFile}))
         if (selectedFile) {
            response = await workerService.storeWithAvatar(formatData({...data, selectedFile}))   
         } else {
            response = await workerService.store(data)   
         }
         console.log('response', response)
         // const response = await Api.post(`/workers`, data)
         // handleUpload(response.data.data.id)
         toast.success('Trabajador registrado correctamente')
         setSelectedFile(null)
         setErrors({})
         storeForm.onResetForm()
      } catch (error) {
         if (error.response) {
            setErrors(error.response.data.errors)
            toast.error('Error al registrar trabajador')
         } else {
            toast.error('Error al registrar trabajador')
         }
      }
   }

   const getWorker = async (id) => {
      console.log('id', id)
      try {
         const response = await Api.get(`/workers/${id}`)
         setWorker(response.data.data)
         console.log('getWorker', worker)
      } catch (error) {
         toast.error('Error al traer trabajador')
      }
   }

   const editWorker = async (id, data) => {
      try {
         let response = null
         console.log('formatData({id, ...data})', formatData({id, ...data, selectedFile}))
         if (selectedFile) {
            response = await workerService.updateWithAvatar(id, formatData({id, ...data, selectedFile}))   
         } else {
            response = await workerService.update(id, {id, ...data})   
         }
         console.log('response', response)
         toast.success('Trabajador editado correctamente')
         setSelectedFile(null)
         setErrors({})
      } catch (error) {
         console.log('error', error)
         toast.error('Error al editar trabajador')
      }
   }

   const formatData = (data) => {
      const formData = new FormData()
      if (data.id)
         formData.append('id', data.id)
      
      formData.append('codigo', data.codigo)
      formData.append('apellidos_nombres', data.apellidos_nombres)
      formData.append('dni', data.dni)
      formData.append('fecha_nacimiento', data.fecha_nacimiento)
      formData.append('fecha_ingreso', data.fecha_ingreso)
      formData.append('occupation_id', data.occupation_id)
      formData.append('worksite_id', data.worksite_id)
      formData.append('images[]', data.selectedFile)

      return formData
   }

   return {
      errors,
      worker,
      storeForm,
      editForm,
      storeWorker,
      getWorker,
      editWorker, 
      
      setSelectedFile,
      handleFileChange, 
      selectedFile
   }
}
