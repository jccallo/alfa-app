import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { useHttpStore } from '../../../store'
import { workerMedicalCareService } from '../../../services'
import { EasyPagination, EasyShowingText, EasyTableBody, EasyTableCol, EasyTableFooter, EasyTableHeader, EasyTableRow } from '../../../lib/easy'
import { useTable } from '../../../hooks'

const initialTable = {
   data: [],
   meta: null,
   pager: null,
   page: 1,
   perPage: 15,
   query: '',
}

const columns = ['ID', 'Codigo', 'Apellidos y Nombres', 'Ocupación', 'D.M.', 'T.A.', 'D.N.L.']

export const TreatedWorkersModal = ({ openTreatedWorkersModal, setOpenTreatedWorkersModal }) => {
   // hooks
   const { tryCatch } = useHttpStore()
   const { source, onUpdateSource } = useTable(initialTable)

   // promises
   const getWorkers = tryCatch(async (page, perPage, query) => {
      const response = await workerMedicalCareService.treatedWorkers({ page, perPage, query })
      onUpdateSource({
         data: response.data.data,
         meta: response.data.meta,
         pager: response.data.pager,
      })
   })

   // memos
   const totalDescansoMedico = useMemo(() => {
      const tdm = source?.meta?.total_descanso_medico
      const tta = source?.meta?.total_trabajo_adecuado
      if (tdm && tta) return parseInt(tdm) + parseInt(tta)
      else return ''
   }, [source?.meta?.total_descanso_medico, source?.meta?.total_trabajo_adecuado])

   // functions
   const sumParcial = (n1, n2) => {
      return n1 && n2 ? parseInt(n1) + parseInt(n2) : ''
   }

   // effects
   useEffect(() => {
      if (openTreatedWorkersModal) {
         getWorkers(source.page, source.perPage, source.query)
      }
   }, [source.page, source.perPage, source.query, openTreatedWorkersModal])

   return (
      <>
         <Modal show={openTreatedWorkersModal} onHide={() => setOpenTreatedWorkersModal(false)} dialogClassName="modal-90w" backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Personal con Atenciones Médicas</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-block">
               <Card>
                  <Card.Body>
                     <EasyTableHeader source={source} onUpdateSource={onUpdateSource}>
                        <Row className="g-3 align-items-center">
                           <Col className="d-flex justify-content-end">
                              <EasyPagination source={source} onUpdateSource={onUpdateSource} />
                           </Col>
                        </Row>
                     </EasyTableHeader>
                     <EasyTableBody columns={columns}>
                        {source.data.length > 0 &&
                           source.data.map((item) => (
                              <EasyTableRow key={item.id} item={item}>
                                 <EasyTableCol>{item.id}</EasyTableCol>
                                 <EasyTableCol>{item.codigo}</EasyTableCol>
                                 <EasyTableCol>{item.apellidos_nombres}</EasyTableCol>
                                 <EasyTableCol>{item.occupation_nombre}</EasyTableCol>
                                 <EasyTableCol>{item.total_descanso_medico}</EasyTableCol>
                                 <EasyTableCol>{item.total_trabajo_adecuado}</EasyTableCol>
                                 <EasyTableCol>{sumParcial(item.total_descanso_medico, item.total_trabajo_adecuado)}</EasyTableCol>
                              </EasyTableRow>
                           ))}
                     </EasyTableBody>
                     <Row className="g-3 align-items-center">
                        <Col className="d-flex justify-content-between">
                           <EasyShowingText source={source} className="form-text" />
                           <div>
                              <Row className="align-items-center g-2">
                                 <Col xs="auto">
                                    <InputGroup size="sm">
                                       <InputGroup.Text>Total D.M.</InputGroup.Text>
                                       <Form.Control type="text" defaultValue={source?.meta?.total_descanso_medico || ''} style={{ width: '67px' }} />
                                    </InputGroup>
                                 </Col>
                                 <Col xs="auto">
                                    <InputGroup size="sm">
                                       <InputGroup.Text>Total T.A.</InputGroup.Text>
                                       <Form.Control type="text" defaultValue={source?.meta?.total_trabajo_adecuado || ''} style={{ width: '67px' }} />
                                    </InputGroup>
                                 </Col>
                                 <Col xs="auto">
                                    <InputGroup size="sm">
                                       <InputGroup.Text>Total D.N.L.</InputGroup.Text>
                                       <Form.Control type="text" defaultValue={totalDescansoMedico} style={{ width: '67px' }} />
                                    </InputGroup>
                                 </Col>
                              </Row>
                           </div>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setOpenTreatedWorkersModal(false)}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}
