import { Button, Card, Col, Dropdown, DropdownButton, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap'
import { useHttpStore } from '../../../store'
import { useTable } from '../../../hooks'
import { workerMedicalCareService } from '../../../services'
import { useEffect, useMemo, useState } from 'react'
import { EasyTableBody, EasyTableCol, EasyTableFooter, EasyTableRow } from '../../../lib/easy'
import { API_URL } from '../../../constants'

const initialTable = {
   data: [],
   meta: null,
   pager: null,
   page: 1,
   perPage: 10,
   query: '',
   type: 'code',
}

const columns = ['ID', 'Mes', 'Contingencia', 'Tipo', 'Fecha Inicio', 'Fecha Final', 'Total Dias']

export const CareHistoryModal = ({ openCareHistoryModal, setOpenCareHistoryModal }) => {
   // states
   const [type, setType] = useState('Código')

   // hooks
   const { tryCatch } = useHttpStore()
   const { source, onUpdateSource } = useTable(initialTable)

   // promises
   const getWorkers = tryCatch(async (page, perPage, query, type) => {
      const response = await workerMedicalCareService.careHistory({ page, perPage, query, type })
      onUpdateSource({
         data: response.data.data,
         meta: response.data.meta,
         pager: response.data.pager,
      })
   })

   // memos
   const totalDias = useMemo(() => (source.meta?.total_dias > 20 ? 20 : source.meta?.total_dias), [source.meta?.total_dias])
   const imageUrl = useMemo(() => {
      const foto = source.meta?.worker?.foto
      if (foto) return `${API_URL}/images/avatars/${foto}`
      else return "./assets/img/no-avatar.png"
   }, [source.meta?.worker?.foto])

   // functions
   const handleSelect = (eventKey, event) => {
      setType(event.target.textContent)
      onUpdateSource({ type: eventKey })
   }

   const handleSearch = () => {
      const { page, perPage, query, type } = source
      getWorkers(page, perPage, query, type)
   }

   // effects
   useEffect(() => {
      if (openCareHistoryModal) handleSearch()
   }, [source.page])

   useEffect(() => {
      if (!openCareHistoryModal) onUpdateSource({ ...initialTable, type: source.type })
   }, [openCareHistoryModal])

   return (
      <>
         <Modal show={openCareHistoryModal} onHide={() => setOpenCareHistoryModal(false)} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Historial por Trabajador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Card className="mb-3">
                  <Card.Body>
                     <Row className="g-3 align-items-center">
                        <Col xs="auto">
                           <Image src={imageUrl} roundedCircle style={{ width: '150px', height: '150px' }} />
                        </Col>
                        <Col>
                           <Row>
                              <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="mb-3">
                                 <Form.Label>Apellidos y Nombres</Form.Label>
                                 <Form.Control type="text" defaultValue={source.meta?.worker?.apellidos_nombres} readOnly />
                              </Form.Group>
                              <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="mb-3">
                                 <Form.Label>Cargo</Form.Label>
                                 <Form.Control type="text" defaultValue={source.meta?.worker?.occupation_nombre} readOnly />
                              </Form.Group>
                              <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} className="mb-3">
                                 <Form.Label>Total de Dias</Form.Label>
                                 <Form.Control type="text" defaultValue={source.meta?.total_dias} readOnly />
                              </Form.Group>
                              <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} className="mb-3">
                                 <Form.Label>Dias No Laborables</Form.Label>
                                 <Form.Control type="text" defaultValue={totalDias} className={`${totalDias > 19 ? 'is-invalid' : ''}`} readOnly />
                              </Form.Group>
                              <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} className="mb-3">
                                 <Form.Label>&nbsp;</Form.Label>
                                 <InputGroup className="mb-3">
                                    <DropdownButton title={type} onSelect={handleSelect} variant="outline-secondary">
                                       <Dropdown.Item eventKey="code">Código</Dropdown.Item>
                                       <Dropdown.Item eventKey="nic">DNI</Dropdown.Item>
                                    </DropdownButton>
                                    <Form.Control name="query" value={source.query} onChange={(e) => onUpdateSource({ query: e.target.value })} />
                                    <Button variant="primary" onClick={handleSearch}>
                                       <i className="bi bi-search"></i>
                                    </Button>
                                 </InputGroup>
                              </Form.Group>
                           </Row>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
               <Card>
                  <Card.Body>
                     <EasyTableBody columns={columns}>
                        {source.data.length > 0 &&
                           source.data.map((item) => (
                              <EasyTableRow key={item.id} item={item}>
                                 <EasyTableCol>{item.id}</EasyTableCol>
                                 <EasyTableCol>{item.mes}</EasyTableCol>
                                 <EasyTableCol>{item.contingency_nombre}</EasyTableCol>
                                 <EasyTableCol>{item.type_medical_care_nombre}</EasyTableCol>
                                 <EasyTableCol>{item.fecha_inicio}</EasyTableCol>
                                 <EasyTableCol>{item.fecha_final}</EasyTableCol>
                                 <EasyTableCol>{item.total_dias}</EasyTableCol>
                              </EasyTableRow>
                           ))}
                     </EasyTableBody>
                     <EasyTableFooter source={source} onUpdateSource={onUpdateSource} />
                  </Card.Body>
               </Card>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setOpenCareHistoryModal(false)}>
                  Cerrar
               </Button>
            </Modal.Footer>
            {/* <pre>{JSON.stringify(source, null, 2)}</pre> */}
         </Modal>
      </>
   )
}
