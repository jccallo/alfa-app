import { useState } from 'react'
import toast from 'react-hot-toast'
import { Card } from 'react-bootstrap'
import { TableFooter, TableHeader, TableCol, TableContent, TableRow, useTable, Popconfirm } from '../../../lib/easy'
import { Api } from '../../../http'
import { ContentLayout } from '../../../layouts'
import { EditModal, StoreModal, ViewModal } from '../components'
import { workerService } from '../../../services'

export const IndexPage = () => {
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [id, setId] = useState(0)
   const [type, setType] = useState('')
   const [show, setShow] = useState(false)

   const handleShow = () => setShow(true)
   const { data, pager, page, perPage, query, setData, setPager, setPage, setPerPage, setQuery, executeFunction } = useTable({
      onFetch: async (page, perPage, query) => await Api.get(`/workers?page=${page}&per_page=${perPage}&query=${query}`),
      onSuccess: (response) => {
         setData(response.data.data)
         setPager(response.data.pager)
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   const columns = ['ID', 'Codigo', 'Apellidos y Nombres', 'DNI', 'Edad']

   const onView = (id) => {
      setId(id)
      setType('view')
      handleShow()
   }

   const onEdit = (id) => {
      setId(id)
      setType('edit')
      handleShow()
   }

   const onDelete = (id) => {
      setId(id)
      setShowDeleteModal(true)
   }

   const onRegister = () => {
      setType('store')
      handleShow()
   }

   const hanldeViewClose = () => {
      setShow(false)
   }

   const hanldeChangeClose = () => {
      if (type === 'edit' || type === 'store' || type === 'delete') executeFunction()
      setShow(false)
   }

   const onCancel = () => setShowDeleteModal(false)

   const onConfirm = async () => {
      try {
         await workerService.delete(id)
         executeFunction()
         setShowDeleteModal(false)
         toast.success('Trabajador borrado correctamente')
      } catch (error) {
         toast.error('Error al eliminar trabajador')
      }
   } 

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
                              <TableCol>{worker.fecha_nacimiento}</TableCol>
                           </TableRow>
                        ))}
                  </TableContent>
                  <TableFooter total={pager.total} perPage={pager.perPage} page={page} displayedCount={data.length} setPage={setPage} />
               </Card.Body>
            </Card>
            {type === 'view' && <ViewModal id={id} show={show} handleClose={hanldeViewClose} />}
            {type === 'edit' && <EditModal id={id} show={show} handleClose={hanldeChangeClose} />}
            {type === 'store' && <StoreModal show={show} handleClose={hanldeChangeClose} />}
         </ContentLayout>
         <Popconfirm show={showDeleteModal} setShow={setShowDeleteModal} title={`Eliminar trabajador #${id}`} description={`¿Esta seguro de eliminar el registro?`} onConfirm={onConfirm} onCancel={onCancel}/>
      </>
   )
}
