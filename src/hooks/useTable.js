import { useState } from "react"

export const useTable = (initialTable = null) => {
   const [source, setSource] = useState(initialTable)

   const onUpdateSource = (newTable) => {
      setSource((prevTable) => ({
         ...prevTable,
         ...newTable,
      }))
   }

   return {
      source,
      onUpdateSource,
   }
}
