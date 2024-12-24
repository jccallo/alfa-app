import { useState } from 'react'
import { Api } from '../../../http'

export const useImageUpload = () => {
   const [selectedFile, setSelectedFile] = useState(null) // Estado para la imagen
   const [preview, setPreview] = useState(null) // Vista previa de la imagen
   const [uploadStatus, setUploadStatus] = useState(null) // Estado para el resultado

   // Manejar el cambio de archivo
   const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         setSelectedFile(file)
         
         // Crear vista previa
         const reader = new FileReader()
         reader.onload = () => setPreview(reader.result)
         reader.readAsDataURL(file)
      } else {
         setSelectedFile(null)
         setPreview(null)
      }
   }

   // Subir el archivo
   // const handleUpload = async (id) => {
   //    if (!selectedFile) {
   //       alert('Por favor, selecciona una imagen')
   //       return
   //    }

   //    const formData = new FormData()
   //    formData.append('images', selectedFile) // Nombre del campo debe coincidir con el backend

   //    try {
   //       const response = await Api.post(`/workers/${id}/avatars`, formData, {
   //          headers: {
   //             'Content-Type': 'multipart/form-data',
   //          },
   //       })
   //       setUploadStatus('Imagen subida exitosamente: ' + response.data.filePath)
   //    } catch (error) {
   //       console.error(error)
   //       setUploadStatus('Error al subir la imagen.')
   //    }
   // }

   return {
      preview,
      uploadStatus,
      selectedFile,
      handleFileChange,
      setSelectedFile,
   }
}
