import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Card } from 'react-bootstrap'
import { TableFooter, TableHeader, TableCol, TableContent, TableRow, useTable, Popconfirm } from '../../../lib/easy'
import { ContentLayout } from '../../../layouts'
import { EditModal, StoreModal, ViewModal } from '../components'
import { workerService } from '../../../services'
import { useIndexStore } from '../store'
import { useHttpStore } from '../../../store'
import { calculateAge } from '../../../utils'

export const IndexPage = () => {
   const { http, tryCatch, errorMessage } = useHttpStore()

   const { setCurrentWorkerId, currentWorkerId } = useIndexStore()
   const [openViewModal, setOpenViewModal] = useState(false)
   const [openEditModal, setOpenEditModal] = useState(false)
   const [openStoreModal, setOpenStoreModal] = useState(false)
   const [showDeleteModal, setShowDeleteModal] = useState(false)

   const { data, pager, page, perPage, query, setData, setPager, setPage, setPerPage, setQuery, executeFunction } = useTable({
      onFetch: async (page, perPage, query) => await http.get(`/workers?page=${page}&per_page=${perPage}&query=${query}`),
      onSuccess: (response) => {
         setData(response.data.data)
         setPager(response.data.pager)
      },
      onError: () => {
         toast.error('Error al listar los trabajadores')
      },
   })

   const columns = ['ID', 'Codigo', 'Apellidos y Nombres', 'DNI', 'Edad', 'Acciones']

   const onView = (id) => {
      setCurrentWorkerId(id)
      setOpenViewModal(true)
   }

   const onEdit = (id) => {
      setCurrentWorkerId(id)
      setOpenEditModal(true)
   }

   const onDelete = (id) => {
      setCurrentWorkerId(id)
      setShowDeleteModal(true)
   }

   const onRegister = () => {
      setOpenStoreModal(true)
   }

   const onCancel = () => setShowDeleteModal(false)

   const onConfirm = tryCatch(async () => {
      await workerService.delete(currentWorkerId)
      executeFunction()
      setShowDeleteModal(false)
      toast.success('Trabajador borrado correctamente')
   })

   // memos
   const edad = (fecha_nacimiento) => {
      const age = calculateAge(fecha_nacimiento)
      return age.years === 0 ? '' : `${age.years} ${age.years === 1 ? 'año' : 'años'}`
   }

   useEffect(() => {
      if (showDeleteModal && errorMessage) toast.success(errorMessage)
   }, [errorMessage])

   return (
      <>
         <ContentLayout title="Trabajadores">
            <Card className="mb-4">
               <Card.Body>
                  <TableHeader perPage={perPage} query={query} setPerPage={setPerPage} setQuery={setQuery}>
                     <button className="btn btn-primary btn-sm" onClick={onRegister}>
                        Registrar
                     </button>
                  </TableHeader>
                  <TableContent columns={columns}>
                     {data.length > 0 &&
                        data.map((worker) => (
                           <TableRow key={worker.id} id={worker.id} onView={onView} onEdit={onEdit} onDelete={onDelete}>
                              <TableCol>{worker.id}</TableCol>
                              <TableCol>{worker.codigo}</TableCol>
                              <TableCol>{worker.apellidos_nombres}</TableCol>
                              <TableCol>{worker.dni}</TableCol>
                              <TableCol>{edad(worker.fecha_nacimiento)}</TableCol>
                           </TableRow>
                        ))}
                  </TableContent>
                  <TableFooter total={pager.total} perPage={pager.perPage} page={page} displayedCount={data.length} setPage={setPage} />
               </Card.Body>
            </Card>
            <ViewModal openViewModal={openViewModal} setOpenViewModal={setOpenViewModal} />
            <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} executeFunction={executeFunction} />
            <StoreModal openStoreModal={openStoreModal} setOpenStoreModal={setOpenStoreModal} executeFunction={executeFunction} />
         </ContentLayout>
         <Popconfirm show={showDeleteModal} setShow={setShowDeleteModal} title={`Eliminar trabajador #${currentWorkerId}`} description={`¿Esta seguro de eliminar el registro?`} onConfirm={onConfirm} onCancel={onCancel} />
      </>
   )
}
