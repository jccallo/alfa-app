import { useEffect } from 'react'
import { useOccupations, useWorkers, useWorksites } from '../hooks'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { InvalidFeedback } from '../../../lib/easy'

export const StoreModal = ({ show, handleClose }) => {
   const { occupations, getOccupations } = useOccupations()
   const { worksites, getWorksites } = useWorksites()
   const { storeWorker, errors, storeForm, handleFileChange } = useWorkers()

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log('storeForm', storeForm)
      await storeWorker(storeForm)
   }

   const execute = async () => {
      await getOccupations()
      await getWorksites()
   }

   useEffect(() => {
      execute()
   }, [])

   return (
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Registrar Trabajador</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formCodigo" className="mb-3">
                     <Form.Label>Código</Form.Label>
                     <Form.Control type="text" name="codigo" value={storeForm.codigo} onChange={storeForm.onInputChange} />
                     {errors.codigo && <InvalidFeedback>{errors.codigo}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formDni" className="mb-3">
                     <Form.Label>DNI</Form.Label>
                     <Form.Control type="text" name="dni" value={storeForm.dni} onChange={storeForm.onInputChange} />
                     {errors.dni && <InvalidFeedback>{errors.dni}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formApellidosNombres" className="mb-3">
                  <Form.Label>Apellidos y Nombres</Form.Label>
                  <Form.Control type="text" name="apellidos_nombres" value={storeForm.apellidos_nombres} onChange={storeForm.onInputChange} required />
                  {errors.apellidos_nombres && <InvalidFeedback>{errors.apellidos_nombres}</InvalidFeedback>}
               </Form.Group>

               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaNacimiento" className="mb-3">
                     <Form.Label>Fecha de Nacimiento</Form.Label>
                     <Form.Control type="date" name="fecha_nacimiento" value={storeForm.fecha_nacimiento} onChange={storeForm.onInputChange} />
                     {errors.fecha_nacimiento && <InvalidFeedback>{errors.fecha_nacimiento}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaIngreso" className="mb-3">
                     <Form.Label>Fecha de Ingreso</Form.Label>
                     <Form.Control type="date" name="fecha_ingreso" value={storeForm.fecha_ingreso} onChange={storeForm.onInputChange} />
                     {errors.fecha_ingreso && <InvalidFeedback>{errors.fecha_ingreso}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formOccupationId" className="mb-3">
                  <Form.Label>Ocupación</Form.Label>
                  <Form.Select name="occupation_id" value={storeForm.occupation_id} onChange={storeForm.onInputChange} required>
                     <option value="">Seleccionar</option>
                     {occupations.map((occupation) => (
                        <option key={occupation.id} value={occupation.id}>
                           {occupation.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {errors.occupation_id && <InvalidFeedback>{errors.occupation_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group controlId="formWorksiteId" className="mb-3">
                  <Form.Label>Trabajo</Form.Label>
                  <Form.Select name="worksite_id" value={storeForm.worksite_id} onChange={storeForm.onInputChange} required>
                     <option value="">Seleccionar</option>worksites
                     {worksites.map((worksite) => (
                        <option key={worksite.id} value={worksite.id}>
                           {worksite.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {errors.worksite_id && <InvalidFeedback>{errors.worksite_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Label>Imagen de Perfil</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
               Guardar
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
