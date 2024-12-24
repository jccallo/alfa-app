import { Button, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { ContentLayout } from '../../../layouts'
import { MedicalCareInterface } from '../../../interfaces'
import { medicalCareService, workerService } from '../../../services'
import { useForm } from '../../../hooks'

import { SearchWorker, WorkerFormState, WorkerSearchState } from '../interfaces'
import { WorkerFormCard, WorkerSearchCard } from '../components'

export const ShowPage = () => {
   // states
   const [searchWorker, setSearchWorker] = useState(SearchWorker)
   const [medicalCare, setMedicalCare] = useState(MedicalCareInterface)

   // hooks
   const navigate = useNavigate()
   const { id } = useParams()
   const { formState: workerSearchState, onUpdateForm, onResetForm: workerSearchReset } = useForm(WorkerSearchState)
   const { formState: workerFormState, onUpdateForm: workerFormUpdate, onInputChange, onResetForm: workerFormReset } = useForm(WorkerFormState)

   const excecute = async () => {
      setSearchWorker(SearchWorker)
      setMedicalCare(MedicalCareInterface)
      try {
         const medicalResponse = await medicalCareService.show(id)
         const medicalCareReceived = medicalResponse.data.data
         setMedicalCare(medicalCareReceived)
         const workResponse = await workerService.showByCode(medicalCareReceived.codigo)
         setSearchWorker(workResponse.data.data)
      } catch (error) {
         toast.error('Error al traer informacion')
      }
   }

   useEffect(() => {
      excecute()
   }, [id])

   useEffect(() => {
      const { diagnostico, transferencia, nro_documento, fecha_inicio, fecha_final, total_dias, observaciones, care_center, contingency, type_medical_care, ...remaining } = medicalCare

      workerFormUpdate({
         diagnostico,
         transferencia,
         nro_documento,
         fecha_inicio,
         fecha_final,
         total_dias,
         observaciones,
         care_center_id: care_center.id,
         contingency_id: contingency.id,
         type_medical_care_id: type_medical_care.id,
      })
   }, [medicalCare])

   return (
      <ContentLayout title="Detalles de Control Médico">
         <WorkerSearchCard searchWorker={searchWorker} setSearchWorker={setSearchWorker} onUpdateForm={onUpdateForm} searchable={false} />
         <WorkerFormCard workerFormState={workerFormState} onInputChange={onInputChange} readOnly={true} />
         <Row>
            <Col xs={12}>
               <Button variant="secondary" onClick={() => navigate(-1)}>
                  Volver
               </Button>
            </Col>
         </Row>
         {/* <pre>{JSON.stringify(workerSearchState, null, 2)}</pre>
         <pre>{JSON.stringify(workerFormState, null, 2)}</pre>
         <pre>{JSON.stringify(medicalCare, null, 2)}</pre> */}
      </ContentLayout>
   )
}
