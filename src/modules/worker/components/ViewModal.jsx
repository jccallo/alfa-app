import { useEffect, useMemo } from 'react'
import { useWorkers } from '../hooks'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { API_URL } from '../../../constants'

export const ViewModal = ({ id, show, handleClose }) => {
   const { worker, getWorker } = useWorkers()

   const execute = async () => {
      await getWorker(id)
   }

   const imgUrl = useMemo(() => {
      return worker.foto ? `${API_URL}/images/avatars/${worker.foto}` : '/src/assets/img/avatar5.png'
   }, [worker.foto])

   useEffect(() => {
      execute()
   }, [id])

   return (
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Detalles de Trabajador #{id}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex justify-content-center mb-4">
               <Image src={imgUrl} roundedCircle style={{ width: '150px', height: '150px' }} />
            </div>
            <Row>
               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Código</Form.Label>
                  <Form.Control type="text" value={worker.codigo} readOnly />
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text" value={worker.dni} readOnly />
               </Form.Group>
            </Row>

            <Form.Group controlId="formApellidosNombres" className="mb-3">
               <Form.Label>Apellidos y Nombres</Form.Label>
               <Form.Control type="text" value={worker.apellidos_nombres} readOnly />
            </Form.Group>

            <Row>
               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control type="date" value={worker.fecha_nacimiento} readOnly />
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Fecha de Ingreso</Form.Label>
                  <Form.Control type="date" value={worker.fecha_ingreso} readOnly />
               </Form.Group>
            </Row>
            <Form.Group className="mb-3">
               <Form.Label>Ocupación</Form.Label>
               <Form.Control value={worker.occupation.nombre} readOnly></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
               <Form.Label>Trabajo</Form.Label>
               <Form.Control value={worker.worksite.nombre} readOnly></Form.Control>
            </Form.Group>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cerrar
            </Button>
         </Modal.Footer>
         {/* <pre>{JSON.stringify(worker, null, 2)}</pre> */}
      </Modal>
   )
}
