import { Card, Col, Row } from 'react-bootstrap'
import { ContentLayout } from '../../../layouts'
import { Popconfirm, TableCol, TableContent, TableFooter, TableHeader, TableRow, useTable } from '../../../lib/easy'
import toast from 'react-hot-toast'
import { Api } from '../../../http'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { medicalCareService } from '../../../services'
import { CareHistoryModal, TreatedWorkersModal } from '../components'

const columns = ['ID', 'Codigo', 'Apellidos y Nombres', 'DNI', 'Nro. Documento', 'Fecha Inicio', 'Fecha Final', 'Total Dias', 'Acciones']

export const IndexPage = () => {
   // states
   const [openTreatedWorkersModal, setOpenTreatedWorkersModal] = useState(false)
   const [openCareHistoryModal, setOpenCareHistoryModal] = useState(false)

   const [show, setShow] = useState(false)
   const [currentId, setCurrentId] = useState('')
   const [data, setData] = useState([])
   const [pager, setPager] = useState({})

   const navigate = useNavigate()

   const { page, perPage, query, setPage, setPerPage, setQuery, executeFunction } = useTable({
      onFetch: async (page, perPage, query) => await Api.get(`/medical-care?page=${page}&per_page=${perPage}&query=${query}`),
      onSuccess: (response) => {
         setData(response.data.data)
         setPager(response.data.pager)
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   // arrows
   const onRegister = () => navigate('../create')
   const onEdit = (id) => navigate(`../edit/${id}`)
   const onView = (id) => navigate(`../show/${id}`)
   const onCancel = () => setShow(false)

   // functons
   const onDelete = (id) => {
      setShow(true)
      setCurrentId(id)
   }

   // methods
   const onConfirm = async () => {
      try {
         await medicalCareService.delete(currentId)
         executeFunction()
         setShow(false)
         toast.success('Control médico borrado correctamente')
      } catch (error) {
         toast.error('Error al eliminar control médico')
      }
   }

   return (
      <>
         <ContentLayout title="Controles Médicos">
            <Card className="mb-4">
               <Card.Body>
                  <TableHeader perPage={perPage} query={query} setPerPage={setPerPage} setQuery={setQuery}>
                     <Row className="g-3 align-items-center">
                        <Col xs="auto">
                           <button className="btn btn-outline-danger btn-sm" onClick={() => setOpenTreatedWorkersModal(true)}>
                              <i className="bi bi-clipboard2-pulse"></i> Atenciones
                           </button>
                        </Col>
                        <Col xs="auto">
                           <button className="btn btn-outline-secondary btn-sm" onClick={() => setOpenCareHistoryModal(true)}>
                              <i className="bi bi-journal-text"></i> Historial
                           </button>
                        </Col>
                        <Col>
                           <button className="btn btn-primary btn-sm" onClick={onRegister}>
                              Registrar
                           </button>
                        </Col>
                     </Row>
                  </TableHeader>
                  <TableContent columns={columns}>
                     {data.length > 0 &&
                        data.map((control) => (
                           <TableRow key={control.id} id={control.id} onView={onView} onEdit={onEdit} onDelete={onDelete}>
                              <TableCol>{control.id}</TableCol>
                              <TableCol>{control.codigo}</TableCol>
                              <TableCol>{control.apellidos_nombres}</TableCol>
                              <TableCol>{control.dni}</TableCol>
                              <TableCol>{control.nro_documento}</TableCol>
                              <TableCol>{control.fecha_inicio}</TableCol>
                              <TableCol>{control.fecha_final}</TableCol>
                              <TableCol>{control.total_dias}</TableCol>
                           </TableRow>
                        ))}
                  </TableContent>
                  <TableFooter total={pager.total} perPage={pager.perPage} page={page} displayedCount={data.length} setPage={setPage} />
               </Card.Body>
            </Card>
         </ContentLayout>
         <Popconfirm show={show} setShow={setShow} title="Eliminar" description={`¿Esta seguro de eliminar el registro #${currentId}?`} onConfirm={onConfirm} onCancel={onCancel} />
         <CareHistoryModal openCareHistoryModal={openCareHistoryModal} setOpenCareHistoryModal={setOpenCareHistoryModal} />
         <TreatedWorkersModal openTreatedWorkersModal={openTreatedWorkersModal} setOpenTreatedWorkersModal={setOpenTreatedWorkersModal} />
      </>
   )
}
