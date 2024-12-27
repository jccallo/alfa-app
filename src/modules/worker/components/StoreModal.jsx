import { useEffect, useMemo, useState } from 'react'
import { useOccupations, useWorkers, useWorksites } from '../hooks'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { InvalidFeedback } from '../../../lib/easy'
import { useHttpStore } from '../../../store'
import { useIndexStore } from '../store'
import { useForm } from '../../../hooks'
import toast from 'react-hot-toast'

// constantes
const initialForm = {
   codigo: '',
   apellidos_nombres: '',
   dni: '',
   fecha_nacimiento: '',
   fecha_ingreso: '',
   occupation_id: '',
   worksite_id: '',
   images: [],
}

export const StoreModal = ({ openStoreModal, setOpenStoreModal, executeFunction }) => {
   // states
   const [dataIsStored, setDataIsStored] = useState(false)

   // stores
   const { tryCatch, validationErrors, errorMessage, resetErrors } = useHttpStore()
   const { occupationsState, worksitesState } = useIndexStore()

   // hooks
   const { getAllOccupations } = useOccupations()
   const { getAllWorksites } = useWorksites()
   const { storeWorker } = useWorkers()

   // forms
   const { formState: storeForm, previews, onInputChange, onResetForm, onResetPreviews } = useForm(initialForm)

   // promises
   const handleSubmit = tryCatch(async () => {
      await storeWorker(storeForm)
      setDataIsStored(true)
      setOpenStoreModal(false)
      toast.success('Trabajador registrado correctamente')
   })

   const execute = tryCatch(async () => {
      await getAllOccupations()
      await getAllWorksites()
   })

   // memos
   const imgUrl = useMemo(() => {
      if (previews.images) return previews.images[0]
      else return '/src/assets/img/no-avatar.png'
   }, [previews.images])

   // effects
   useEffect(() => {
      if (openStoreModal) execute()
      else {
         if (dataIsStored) executeFunction()
         onResetPreviews()
         resetErrors()
         onResetForm()
      }
   }, [openStoreModal])

   useEffect(() => {
      if (openStoreModal && errorMessage) toast.error(errorMessage)
   }, [errorMessage])

   return (
      <Modal size="lg" show={openStoreModal} onHide={() => setOpenStoreModal(false)} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Registrar Trabajador</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex justify-content-center mb-4">
               <Image src={imgUrl} roundedCircle style={{ width: '150px', height: '150px' }} />
            </div>
            <Form>
               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formCodigo" className="mb-3">
                     <Form.Label>Código</Form.Label>
                     <Form.Control type="text" name="codigo" value={storeForm.codigo} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.codigo}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formDni" className="mb-3">
                     <Form.Label>DNI</Form.Label>
                     <Form.Control type="text" name="dni" value={storeForm.dni} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.dni}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formApellidosNombres" className="mb-3">
                  <Form.Label>Apellidos y Nombres</Form.Label>
                  <Form.Control type="text" name="apellidos_nombres" value={storeForm.apellidos_nombres} onChange={onInputChange} required />
                  {validationErrors && <InvalidFeedback>{validationErrors.apellidos_nombres}</InvalidFeedback>}
               </Form.Group>

               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaNacimiento" className="mb-3">
                     <Form.Label>Fecha de Nacimiento</Form.Label>
                     <Form.Control type="date" name="fecha_nacimiento" value={storeForm.fecha_nacimiento} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.fecha_nacimiento}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaIngreso" className="mb-3">
                     <Form.Label>Fecha de Ingreso</Form.Label>
                     <Form.Control type="date" name="fecha_ingreso" value={storeForm.fecha_ingreso} onChange={onInputChange} />
                     {validationErrors && <InvalidFeedback>{validationErrors.fecha_ingreso}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formOccupationId" className="mb-3">
                  <Form.Label>Ocupación</Form.Label>
                  <Form.Select name="occupation_id" value={storeForm.occupation_id} onChange={onInputChange} required>
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
                  <Form.Select name="worksite_id" value={storeForm.worksite_id} onChange={onInputChange} required>
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
                  <Form.Control type="file" name="images" accept="image/*" onChange={onInputChange} />
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenStoreModal(false)}>
               Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
               Guardar
            </Button>
         </Modal.Footer>
         {/* {previews.images ? <img src={previews.images[0]} style={{ width: 100, height: 100 }} /> : <img src={'/src/assets/img/no-avatar.png'} style={{ width: 100, height: 100 }} />}
         <pre>{JSON.stringify(previews.images, null, 2)}</pre>
         <pre>{JSON.stringify(storeForm, null, 2)}</pre> */}
      </Modal>
   )
}
