import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { WorkerSearchModal } from './WorkerSearchModal'
import { calculateAge } from '../../../utils'

export const WorkerSearchCard = ({ searchWorker, setSearchWorker, onUpdateForm, searchable = true }) => {
   // states
   const [show, setShow] = useState(false)

   // arrows
   const handleClose = () => setShow(false)
   const handleShow = () => setShow(true)

   // memos
   const edad = useMemo(() => {
      const age = calculateAge(searchWorker.fecha_nacimiento)
      return age.years === 0 ? '' : `${age.years} ${age.years === 1 ? 'año' : 'años'}`
   }, [searchWorker.fecha_nacimiento])

   // effects
   useEffect(() => {
      const { codigo, dni } = searchWorker
      onUpdateForm({ codigo, dni })
   }, [searchWorker])

   return (
      <>
         <Card className="mb-3">
            <Card.Body>
               <p className="fs-5">Trabajador</p>
               <Row>
                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Código</Form.Label>
                     <Form.Control type="text" value={searchWorker.codigo} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>DNI</Form.Label>
                     <Form.Control type="text" value={searchWorker.dni} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Apellidos y Nombres</Form.Label>
                     <Form.Control type="text" value={searchWorker.apellidos_nombres} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Edad</Form.Label>
                     <Form.Control type="text" value={edad} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Fecha Ingreso</Form.Label>
                     <Form.Control type="text" value={searchWorker.fecha_ingreso} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Ocupacion</Form.Label>
                     <Form.Control type="text" value={searchWorker.occupation.nombre} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label>Zona de Trabajo</Form.Label>
                     <Form.Control type="text" value={searchWorker.worksite.nombre} readOnly />
                  </Form.Group>

                  {searchable && <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                     <Form.Label className="d-none d-md-block">&nbsp;</Form.Label>
                     <Button variant="success" onClick={handleShow}>
                        Buscar
                     </Button>
                  </Form.Group>}
               </Row>
            </Card.Body>
         </Card>
         <WorkerSearchModal show={show} handleClose={handleClose} searchWorker={searchWorker} setSearchWorker={setSearchWorker} />
      </>
   )
}
