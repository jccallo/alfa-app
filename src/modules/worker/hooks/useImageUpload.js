import { useState } from 'react'

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

   return {
      preview,
      uploadStatus,
      selectedFile,
      setPreview,
      setSelectedFile,
      setUploadStatus,
      handleFileChange,
   }
}
