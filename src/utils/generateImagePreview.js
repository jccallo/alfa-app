export const generateImagePreview = (file) => {
   return new Promise((resolve, reject) => {
      if (!file) {
         reject(new Error('No se proporcionó un archivo válido.'))
         return
      }

      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
   })
}
