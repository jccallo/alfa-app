import { API_URL } from '../constants'
import { create } from 'zustand'
import axios from 'axios'

// Primero, definimos el store
export const useHttpStore = create((set, get) => ({
   // states
   isFetching      : false,
   token           : '',
   http            : null,
   errorMessage    : '',
   validationErrors: null,
   // actions
   startFetching      : () => set({ isFetching: true }),
   stopFetching       : () => set({ isFetching: false }),
   setErrorMessage    : (message) => set({ errorMessage: message }),
   setValidationErrors: (errors) => set({ validationErrors: errors }),
   tryCatch           : null,
   toFormData         : null,

   // resets
   resetErrors: () => set({ errorMessage: '', validationErrors: null }),
}))

// Definir createAxiosInstance, que necesita el store
const createAxiosInstance = (baseURL) => {
   const instance = axios.create({
      baseURL,
   })

   instance.interceptors.request.use(
      (config) => {
         // Configuraciones adicionales (como un token) se pueden agregar aquí
         return config
      },
      (error) => {
         useHttpStore.getState().stopFetching() // Llamamos a stopFetching desde el store
         return Promise.reject(error)
      }
   )

   instance.interceptors.response.use(
      (response) => {
         return response
      },
      (error) => {
         useHttpStore.getState().stopFetching() // Llamamos a stopFetching desde el store
         return Promise.reject(error)
      }
   )

   return instance
}

// Definir tryCatch
const tryCatch = (func) => {
   return async (...args) => {
      try {
         useHttpStore.getState().startFetching()
         await Promise.resolve(func(...args))
         useHttpStore.getState().setErrorMessage('')
         useHttpStore.getState().setValidationErrors(null)
      } catch (err) {
         const validationErrors = err.response?.data?.errors
         const errorMessage = err.response?.data?.message
         if (validationErrors) {
            useHttpStore.getState().setValidationErrors(validationErrors)
            useHttpStore.getState().setErrorMessage('Errores de validación')
         } else if (errorMessage) {
            useHttpStore.getState().setErrorMessage(errorMessage)
            useHttpStore.getState().setValidationErrors(null)
         } else if (err.message) {
            useHttpStore.getState().setErrorMessage(err.message)
            useHttpStore.getState().setValidationErrors(null)
         } else {
            useHttpStore.getState().setErrorMessage('Error...')
            useHttpStore.getState().setValidationErrors(null)
         }
      } finally {
         useHttpStore.getState().stopFetching()
      }
   }
}

function toFormData(obj, form = new FormData(), parentKey = '') {
   for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
         let prop = obj[key]
         let formKey = parentKey ? `${parentKey}[${key}]` : key

         // Si el valor es null, lo omitimos
         if (prop === null) continue

         // Si el valor es un objeto o un array, lo convertimos a cadena
         if (prop instanceof File || prop instanceof Blob) {
            // Si es un archivo o imagen, lo agregamos directamente
            form.append(formKey, prop);
         } else if (typeof prop === 'object' && prop !== null) {
            // Convertimos a cadena JSON para anidamientos
            form.append(formKey, JSON.stringify(prop))
         } else {
            // Si no es objeto o array, agregamos el valor normalmente
            form.append(formKey, prop)
         }
      }
   }
   return form
}

// Ahora, inicializamos `http` y `tryCatch` en el store
useHttpStore.setState({
   http: createAxiosInstance(API_URL),
   tryCatch,
   toFormData,
})

// config.headers.Authorization = `Bearer ${token}`;
