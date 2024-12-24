import LoadingBar from 'react-top-loading-bar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useRef } from 'react'

import { AuthLayout, MainLayout } from './layouts'
import { AuthRoutes } from './modules/auth/AuthRoutes'
import { ControlRoutes } from './modules/control/ControlRoutes'
import { WorkerRoutes } from './modules/worker/WorkerRoutes'
import { useHttpStore } from './store'

function App() {
   const ref = useRef(null)
   const { isFetching } = useHttpStore()

   useEffect(() => {
      if (isFetching) ref.current?.continuousStart()
      else ref.current?.complete()
   }, [isFetching])

   return (
      <>
         <LoadingBar color="#dc3545" ref={ref} shadow={true} />
         <Toaster />
         <Routes>
            <Route path="auth/*" element={<AuthLayout />}>
               <Route path="*" element={<AuthRoutes />} />
            </Route>
            <Route path="app/*" element={<MainLayout />}>
               <Route path="controls/*" element={<ControlRoutes />} />
               <Route path="workers/*" element={<WorkerRoutes />} />
               <Route path="*" element={<Navigate to="controls" replace />} />
            </Route>
         </Routes>
      </>
   )
}

export default App
