import { useEffect } from 'react'
import { useImageUpload, useOccupations, useWorkers, useWorksites } from '../hooks'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { InvalidFeedback } from '../../../lib/easy'

export const EditModal = ({ id, show, handleClose }) => {
   const { occupations, getOccupations } = useOccupations()
   const { worksites, getWorksites } = useWorksites()
   const { editWorker, getWorker, worker, errors, editForm, handleFileChange, setSelectedFile } = useWorkers()

   const handleSubmit = async (event) => {
      event.preventDefault();
      await editWorker(id, editForm)
   };

   const execute = async () => {
      await getOccupations()
      await getWorksites()
      await getWorker(id)
   }

   useEffect(() => {
      execute()
   }, [id])

   useEffect(() => {
      if (worker) {
         editForm.onUpdateForm({
            id               : worker.id,
            codigo           : worker.codigo,
            apellidos_nombres: worker.apellidos_nombres,
            dni              : worker.dni,
            fecha_nacimiento : worker.fecha_nacimiento,
            fecha_ingreso    : worker.fecha_ingreso,
            occupation_id    : worker.occupation.id,
            worksite_id      : worker.worksite.id,
         })
      }
   }, [worker])

   return (
      <Modal
         size="lg"
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
      >
         <Modal.Header closeButton>
            <Modal.Title>Editar Trabajador #{id}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formCodigo" className="mb-3">
                     <Form.Label>Código</Form.Label>
                     <Form.Control
                        type="text"
                        name="codigo"
                        value={editForm.codigo}
                        onChange={editForm.onInputChange}
                     />
                     {errors.codigo && <InvalidFeedback>{errors.codigo}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formDni" className="mb-3">
                     <Form.Label>DNI</Form.Label>
                     <Form.Control
                        type="text"
                        name="dni"
                        value={editForm.dni}
                        onChange={editForm.onInputChange}
                     />
                     {errors.dni && <InvalidFeedback>{errors.dni}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formApellidosNombres" className="mb-3">
                  <Form.Label>Apellidos y Nombres</Form.Label>
                  <Form.Control
                     type="text"
                     name="apellidos_nombres"
                     value={editForm.apellidos_nombres}
                     onChange={editForm.onInputChange}
                  />
                  {errors.apellidos_nombres && <InvalidFeedback>{errors.apellidos_nombres}</InvalidFeedback>}
               </Form.Group>

               <Row>
                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaNacimiento" className="mb-3">
                     <Form.Label>Fecha de Nacimiento</Form.Label>
                     <Form.Control
                        type="date"
                        name="fecha_nacimiento"
                        value={editForm.fecha_nacimiento}
                        onChange={editForm.onInputChange}
                     />
                     {errors.fecha_nacimiento && <InvalidFeedback>{errors.fecha_nacimiento}</InvalidFeedback>}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={6} controlId="formFechaIngreso" className="mb-3">
                     <Form.Label>Fecha de Ingreso</Form.Label>
                     <Form.Control
                        type="date"
                        name="fecha_ingreso"
                        value={editForm.fecha_ingreso}
                        onChange={editForm.onInputChange}
                     />
                     {errors.fecha_ingreso && <InvalidFeedback>{errors.fecha_ingreso}</InvalidFeedback>}
                  </Form.Group>
               </Row>

               <Form.Group controlId="formOccupationId" className="mb-3">
                  <Form.Label>Ocupación</Form.Label>
                  <Form.Select
                     name="occupation_id"
                     value={editForm.occupation_id}
                     onChange={editForm.onInputChange}
                     required
                  >
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
                  <Form.Select
                     name="worksite_id"
                     value={editForm.worksite_id}
                     onChange={editForm.onInputChange}
                  >
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
            <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
         </Modal.Footer>
      </Modal>
   )
}