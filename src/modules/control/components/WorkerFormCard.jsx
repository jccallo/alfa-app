import { useEffect, useMemo } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

import { calculateDaysBetweenDates, getYearMonthAndDay } from '../../../utils'
import { InvalidFeedback } from '../../../lib/easy'
import { useCareCenters, useContingencies, useTypesMedicalCare } from '../hooks'

export const WorkerFormCard = ({ workerFormState, onInputChange, errors = {}, readOnly = false }) => {
   const { contingencies, getContingencies } = useContingencies()
   const { careCenters, getCareCenters } = useCareCenters()
   const { typesMedicalCare, getTypesMedicalCare } = useTypesMedicalCare()

   // computadas
   const getYearMonth = useMemo(() => getYearMonthAndDay(workerFormState.fecha_inicio), [workerFormState.fecha_inicio])
   workerFormState.total_dias = useMemo(() => calculateDaysBetweenDates(workerFormState.fecha_inicio, workerFormState.fecha_final), [workerFormState.fecha_inicio, workerFormState.fecha_final])

   // funciones
   const executeFunction = async () => {
      await getContingencies()
      await getCareCenters()
      await getTypesMedicalCare()
   }

   useEffect(() => {
      executeFunction()
   }, [])

   return (
      <Card className="mb-3">
         <Card.Body>
            <p className="fs-5">Información</p>
            <Row>
               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} controlId="formContingencyId" className="mb-3">
                  <Form.Label>Contingencia</Form.Label>
                  <Form.Select name="contingency_id" value={workerFormState.contingency_id} onChange={onInputChange} readOnly={readOnly}>
                     <option value="">Seleccionar</option>
                     {contingencies.map((contingency) => (
                        <option key={contingency.id} value={contingency.id}>
                           {contingency.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {errors.contingency_id && <InvalidFeedback>{errors.contingency_id}</InvalidFeedback>}
               </Form.Group>
               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Diagnostico</Form.Label>
                  <Form.Control type="text" name="diagnostico" value={workerFormState.diagnostico} onChange={onInputChange} readOnly={readOnly} />
                  {errors.diagnostico && <InvalidFeedback>{errors.diagnostico}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Lugar de Atención</Form.Label>
                  <Form.Select name="care_center_id" value={workerFormState.care_center_id} onChange={onInputChange} readOnly={readOnly}>
                     <option value="">Seleccionar</option>
                     {careCenters.map((careCenter) => (
                        <option key={careCenter.id} value={careCenter.id}>
                           {careCenter.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {errors.care_center_id && <InvalidFeedback>{errors.care_center_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Transferido</Form.Label>
                  <Form.Select name="transferencia" value={workerFormState.transferencia} onChange={onInputChange} readOnly={readOnly}>
                     <option value="">Seleccionar</option>
                     <option value="1">SI</option>
                     <option value="0">NO</option>
                  </Form.Select>
                  {errors.transferencia && <InvalidFeedback>{errors.transferencia}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select name="type_medical_care_id" value={workerFormState.type_medical_care_id} onChange={onInputChange} readOnly={readOnly}>
                     <option value="">Seleccionar</option>
                     {typesMedicalCare.map((typeMedicalCare) => (
                        <option key={typeMedicalCare.id} value={typeMedicalCare.id}>
                           {typeMedicalCare.nombre}
                        </option>
                     ))}
                  </Form.Select>
                  {errors.type_medical_care_id && <InvalidFeedback>{errors.type_medical_care_id}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>N° Documento</Form.Label>
                  <Form.Control type="text" name="nro_documento" value={workerFormState.nro_documento} onChange={onInputChange} readOnly={readOnly} />
                  {errors.nro_documento && <InvalidFeedback>{errors.nro_documento}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Fecha Incio</Form.Label>
                  <Form.Control type="date" name="fecha_inicio" value={workerFormState.fecha_inicio} onChange={onInputChange} readOnly={readOnly} />
                  {errors.fecha_inicio && <InvalidFeedback>{errors.fecha_inicio}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className="mb-3">
                  <Form.Label>Fecha Final</Form.Label>
                  <Form.Control type="date" name="fecha_final" value={workerFormState.fecha_final} onChange={onInputChange} readOnly={readOnly} />
                  {errors.fecha_final && <InvalidFeedback>{errors.fecha_final}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={6} className="mb-3">
                  <Form.Label>Observación</Form.Label>
                  <Form.Control type="text" name="observaciones" value={workerFormState.observaciones || ''} onChange={onInputChange} readOnly={readOnly} />
                  {errors.Observación && <InvalidFeedback>{errors.Observación}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={2} className="mb-3">
                  <Form.Label>Total de Dias</Form.Label>
                  <Form.Control type="text" name="total_dias" value={workerFormState.total_dias} onChange={onInputChange} readOnly={readOnly} />
                  {errors.total_dias && <InvalidFeedback>{errors.total_dias}</InvalidFeedback>}
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={2} className="mb-3">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control type="text" defaultValue={getYearMonth.monthName} readOnly={readOnly} />
               </Form.Group>

               <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} xl={4} xxl={2} className="mb-3">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="text" defaultValue={getYearMonth.year} readOnly={readOnly} />
               </Form.Group>
            </Row>
         </Card.Body>
      </Card>
   )
}
