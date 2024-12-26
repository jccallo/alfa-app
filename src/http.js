import axios from 'axios'
import { API_URL } from './constants'
import { useHttpStore } from './store'
import toast from 'react-hot-toast'

const createApiInstance = (baseURL) => {
   const instance = axios.create({
      baseURL,
   })

   const { stopFetching } = useHttpStore.getState()

   instance.interceptors.request.use(
      (config) => {
         // config.headers.Authorization = `Bearer ${token}`;
         return config
      },
      (error) => {
         stopFetching()
         return Promise.reject(error)
      }
   )

   instance.interceptors.response.use(
      (response) => {
         return response
      },
      (error) => {
         stopFetching()
         return Promise.reject(error)
      }
   )

   return instance
}

const trayCatch = async ({ onFetch, onSuccess, onError, onFinally, params }) => {
   const { startFetching, stopFetching } = useHttpStore.getState()

   try {
      startFetching()
      const result = await Promise.resolve(onFetch(params))
      if (onSuccess) onSuccess(result)
   } catch (err) {
      if (onError) onError(err)
      else toast.error('Error en la peticion')
   } finally {
      stopFetching()
      if (onFinally) onFinally()
   }
}

export const Api = createApiInstance(API_URL)

// // Crear una instancia de Axios con configuración predeterminada
// export const http = axios.create({
//    baseURL: 'https://api.giphy.com/v1/gifs/search',
// })

// // interceptores de solicitud
// http.interceptors.request.use(
//    (config) => {
//       // Puedes agregar lógica adicional aquí (por ejemplo, agregar un token de autenticación)
//       // config.headers.Authorization = `Bearer ${token}`;
//       return config
//    },
//    (error) => {
//       return Promise.reject(error)
//    }
// )

// // interceptores de respuesta
// http.interceptors.response.use(
//    (response) => {
//       return response
//    },
//    (error) => {
//       return Promise.reject(error)
//    }
// )
