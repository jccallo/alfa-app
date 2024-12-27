import { useEffect, useMemo } from 'react'
import { useWorkers } from '../hooks'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { API_URL } from '../../../constants'
import { useIndexStore } from '../store'
import { useHttpStore } from '../../../store'

export const ViewModal = ({ openViewModal, setOpenViewModal }) => {
   // hook
   const { tryCatch } = useHttpStore()

   // stores
   const { currentWorkerId, workerState, resetState } = useIndexStore()

   // hooks
   const { getWorkerById } = useWorkers()

   // memos
   const imgUrl = useMemo(() => (workerState.foto ? `${API_URL}/images/avatars/${workerState.foto}` : '/src/assets/img/no-avatar.png'), [workerState.foto])

   // promesas
   const execute = tryCatch(async () => {
      await getWorkerById(currentWorkerId)
   })

   // effects
   useEffect(() => {
      if (openViewModal) {
         if (currentWorkerId > 0) execute()
      } else {
         resetState()
      }
   }, [openViewModal])

   return (
      <Modal size="lg" show={openViewModal} onHide={() => setOpenViewModal(false)} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Detalles de Trabajador #{workerState.id}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex justify-content-center mb-4">
               <Image src={imgUrl} roundedCircle style={{ width: '150px', height: '150px' }} />
            </div>
            <Row>
               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Código</Form.Label>
                  <Form.Control type="text" value={workerState.codigo} readOnly />
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text" value={workerState.dni} readOnly />
               </Form.Group>
            </Row>

            <Form.Group controlId="formApellidosNombres" className="mb-3">
               <Form.Label>Apellidos y Nombres</Form.Label>
               <Form.Control type="text" value={workerState.apellidos_nombres} readOnly />
            </Form.Group>

            <Row>
               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control type="date" value={workerState.fecha_nacimiento} readOnly />
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={6} className="mb-3">
                  <Form.Label>Fecha de Ingreso</Form.Label>
                  <Form.Control type="date" value={workerState.fecha_ingreso} readOnly />
               </Form.Group>
            </Row>
            <Form.Group className="mb-3">
               <Form.Label>Ocupación</Form.Label>
               <Form.Control value={workerState.occupation.nombre} readOnly></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
               <Form.Label>Trabajo</Form.Label>
               <Form.Control value={workerState.worksite.nombre} readOnly></Form.Control>
            </Form.Group>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenViewModal(false)}>
               Cerrar
            </Button>
         </Modal.Footer>
         {/* <pre>{JSON.stringify(workerState, null, 2)}</pre> */}
      </Modal>
   )
}
