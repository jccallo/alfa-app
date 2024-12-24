import { useEffect, useState } from 'react'
import { useHttpStore } from '../../store'

export const useTable = ({ onFetch, onSuccess, onError, onFinally }) => {
   const [data, setData] = useState([])
   const [pager, setPager] = useState({})
   const [page, setPage] = useState(1)
   const [perPage, setPerPage] = useState(15)
   const [query, setQuery] = useState('')

   const { startFetching, stopFetching } = useHttpStore()

   const executeFunction = async () => {
      try {
         startFetching()
         const result = await Promise.resolve(onFetch(page, perPage, query))
         if (onSuccess) onSuccess(result)
      } catch (err) {
         if (onError) onError(err)
      } finally {
         stopFetching()
         if (onFinally) onFinally()
      }
   }

   useEffect(() => {
      executeFunction()
   }, [page, perPage, query])

   return {
      data,
      pager,
      page,
      perPage,
      query,
      setData,
      setPager,
      setPage,
      setPerPage,
      setQuery,
      executeFunction,
   }
}
