import { useEffect, useMemo, useState } from 'react'
import { useOccupations, useWorkers, useWorksites } from '../hooks'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { InvalidFeedback } from '../../../lib/easy'
import { useIndexStore } from '../store'
import { useForm } from '../../../hooks'
import { API_URL } from '../../../constants'
import toast from 'react-hot-toast'
import { useHttpStore } from '../../../store'

const initialForm = {
   id               : '',
   codigo           : '',
   apellidos_nombres: '',
   dni              : '',
   fecha_nacimiento : '',
   fecha_ingreso    : '',
   occupation_id    : '',
   worksite_id      : '',
   images           : [],
}

export const EditModal = ({ openEditModal, setOpenEditModal, executeFunction }) => {
   // states
   const [dataIsUpdated, setDataIsUpdated] = useState(false)
   
   // stores
   const { tryCatch, validationErrors, errorMessage, resetErrors }          = useHttpStore()
   const { currentWorkerId, occupationsState, worksitesState, workerState, resetState } = useIndexStore()
   
   // hooks
   const { getAllOccupations }                               = useOccupations()
   const { getAllWorksites }                                 = useWorksites()
   const { editWorker, getWorkerById }                       = useWorkers()

   // forms
   const { formState: editForm, previews, onUpdateForm, onInputChange, onResetForm, onResetPreviews } = useForm(initialForm)

   // memos
   const imgUrl = useMemo(() => {
      if (previews.images) return previews.images[0]
      else if (workerState.foto) return `${API_URL}/images/avatars/${workerState.foto}`
      else return '/src/assets/img/no-avatar.png'
   }, [workerState.foto, previews.images])

   // promises
   const handle = tryCatch(async () => {
      await editWorker(currentWorkerId, editForm)
      onUpdateForm({ images: [] })
      setDataIsUpdated(true)
      toast.success('Trabajor editado correctamente')
   })

   const execute = tryCatch(async () => {
      await getAllOccupations()
      await getAllWorksites()
      await getWorkerById(currentWorkerId)
   })

   // effects
   useEffect(() => {
      if (openEditModal) {
         if (currentWorkerId > 0) execute()
      }
      else {
         if (dataIsUpdated) executeFunction()
         onResetPreviews()
         onResetForm()
         resetState()
         resetErrors()
      }
   }, [openEditModal])

   useEffect(() => {
      if (openEditModal && errorMessage) toast.error(errorMessage)
   }, [errorMessage])

   useEffect(() => {
      if (workerState) {
         onUpdateForm({
            id               : workerState.id,
            codigo           : workerState.codigo,
            apellidos_nombres: workerState.apellidos_nombres,
            dni              : workerState.dni,
            fecha_nacimiento : workerState.fecha_nacimiento,
            fecha_ingreso    : workerState.fecha_ingreso,
            occupation_id    : workerState.occupation.id,
            worksite_id      : workerState.worksite.id,
         })
      }
   }, [workerState])

   return (
      <Modal size="lg" show={openEditModal} onHide={() => setOpenEditModal(false)} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Editar Trabajador #{currentWorkerId}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex justify-content-center mb-4">
               <Image src={imgUrl} roundedCircle style={{ width: '150px', height: '150px' }} />
            </div>
            <Form>
               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formCodigo" className="mb-3">
                     <Form.Label>Código</Form.Label>
                     <Form.Control type="text" name="codigo" value={editForm.codigo} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.codigo}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formDni" className="mb-3">
                     <Form.Label>DNI</Form.Label>
                     <Form.Control type="text" name="dni" value={editForm.dni} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.dni}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formApellidosNombres" className="mb-3">
                  <Form.Label>Apellidos y Nombres</Form.Label>
                  <Form.Control type="text" name="apellidos_nombres" value={editForm.apellidos_nombres} onChange={onInputChange} />
                  {validationErrors && <InvalidFeedback>{validationErrors.apellidos_nombres}</InvalidFeedback>}
               </Form.Group>

               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaNacimiento" className="mb-3">
                     <Form.Label>Fecha de Nacimiento</Form.Label>
                     <Form.Control type="date" name="fecha_nacimiento" value={editForm.fecha_nacimiento} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.fecha_nacimiento}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaIngreso" className="mb-3">
                     <Form.Label>Fecha de Ingreso</Form.Label>
                     <Form.Control type="date" name="fecha_ingreso" value={editForm.fecha_ingreso} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.fecha_ingreso}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formOccupationId" className="mb-3">
                  <Form.Label>Ocupación</Form.Label>
                  <Form.Select name="occupation_id" value={editForm.occupation_id} onChange={onInputChange} required>
                     <option value="">Seleccionar</option>
                     {occupationsState.map((occupation) => (
                        <option key={occupation.id} value={occupation.id}>
                           {occupation.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {validationErrors && <InvalidFeedback>{validationErrors.occupation_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group controlId="formWorksiteId" className="mb-3">
                  <Form.Label>Trabajo</Form.Label>
                  <Form.Select name="worksite_id" value={editForm.worksite_id} onChange={onInputChange}>
                     <option value="">Seleccionar</option>
                     {worksitesState.map((worksite) => (
                        <option key={worksite.id} value={worksite.id}>
                           {worksite.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {validationErrors && <InvalidFeedback>{validationErrors.worksite_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Label>Imagen de Perfil</Form.Label>
                  <Form.Control type="file" accept="image/*" name="images" onChange={onInputChange} />
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenEditModal(false)}>
               Cancelar
            </Button>
            <Button variant="primary" onClick={handle}>
               Guardar
            </Button>
         </Modal.Footer>
         {/* <pre>{JSON.stringify(previews, null, 2)}</pre>
         <pre>{JSON.stringify(editForm, null, 2)}</pre> */}
      </Modal>
   )
}
