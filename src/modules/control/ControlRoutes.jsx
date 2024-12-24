import { Navigate, Route, Routes } from "react-router"
import { IndexPage, CreatePage, EditPage, ShowPage } from "./pages"

export const ControlRoutes = () => {
   return (
      <Routes>
         <Route path="index" element={<IndexPage />} />
         <Route path="create" element={<CreatePage />} />
         <Route path="edit/:id" element={<EditPage />} />
         <Route path="show/:id" element={<ShowPage />} />
         <Route path='*' element={<Navigate to="index" replace />} />
      </Routes>
   )
}