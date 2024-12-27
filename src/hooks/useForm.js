import { useEffect, useState } from 'react'
import { generateImagePreview } from '../utils'

export const useForm = (initialForm = {}) => {
   const [formState, setFormState] = useState(initialForm)
   const [selectedFiles, setSelectedFiles] = useState([])
   const [name, setName] = useState('')
   const [previews, setPreviews] = useState({})

   const onInputChange = async ({ target: { name, value, files, type } }) => {
      if (type === 'file') {
         const filesToArray = Array.from(files || [])
         setName(name)
         setSelectedFiles(filesToArray)

         try {
            const generatedPreviews = await Promise.all(filesToArray.map((file) => generateImagePreview(file)))
            setPreviews((prevPreviews) => ({
               ...prevPreviews,
               [name]: generatedPreviews,
            }))
         } catch (error) {
            setPreviews((prevPreviews) => ({
               ...prevPreviews,
               [name]: [],
            }))
            console.error('Error al generar los previos:', error)
         }
      } else {
         setFormState((prevState) => ({
            ...prevState,
            [name]: value,
         }))
      }
   }

   const onUpdateForm = (newForm) => {
      setFormState((prevState) => ({
         ...prevState,
         ...newForm,
      }))
   }

   const onResetForm = () => {
      setFormState(initialForm)
   }

   const onResetPreviews = () => {
      setPreviews([])
   }

   const formAction = {
      onInputChange,
      onResetForm,
      onUpdateForm,
      onResetPreviews,
   }

   useEffect(() => {
      if (name) {
         setFormState((prevState) => ({
            ...prevState,
            [name]: selectedFiles,
         }))
      }
   }, [selectedFiles, name])

   return {
      formState,
      formAction,
      ...formState,
      ...formAction,
      previews,
   }
}
