import { Navigate, Route, Routes } from "react-router"
import { IndexPage } from "./pages/IndexPage"

export const WorkerRoutes = () => {
   return (
      <Routes>
         <Route path="index" element={<IndexPage />} />
         <Route path='*' element={<Navigate to="index" replace />} />
      </Routes>
   )
}