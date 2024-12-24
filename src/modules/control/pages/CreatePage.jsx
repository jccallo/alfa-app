import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button, Col, Row } from 'react-bootstrap'
import { ContentLayout } from '../../../layouts'
import { medicalCareService } from '../../../services'
import { SearchWorker, WorkerFormState, WorkerSearchState } from '../interfaces'
import { useForm } from '../../../hooks'
import { WorkerFormCard, WorkerSearchCard } from '../components'
import { useNavigate } from 'react-router-dom'

export const CreatePage = () => {
   // states
   const [errors, setErrors] = useState({})
   const [searchWorker, setSearchWorker] = useState(SearchWorker)

   // hooks
   const navigate = useNavigate();
   const { formState: workerSearchState, onUpdateForm, onResetForm: workerSearchReset } = useForm(WorkerSearchState)
   const { formState: workerFormState, onInputChange, onResetForm: workerFormReset } = useForm(WorkerFormState)

   // functions
   const store = async () => {
      try {
         await medicalCareService.store({ ...workerSearchState, ...workerFormState })
         setSearchWorker(SearchWorker)
         workerSearchReset()
         workerFormReset()
         setErrors({})
         toast.success('Control médico registrado correctamente')
      } catch (error) {
         setErrors(error.response.data.errors)
         toast.error('Error al registrar control medico')
      }
   }

   return (
      <ContentLayout title="Registrar Control Médico">
         <WorkerSearchCard searchWorker={searchWorker} setSearchWorker={setSearchWorker} onUpdateForm={onUpdateForm} />
         <WorkerFormCard workerFormState={workerFormState} onInputChange={onInputChange} errors={errors} />
         <Row>
            <Col xs={12}>
               <Button variant="secondary" onClick={() => navigate(-1)}>
                  Cancelar
               </Button>
               <Button type="submit" variant="primary" className="float-end" onClick={store} disabled={searchWorker.codigo === ''}>
                  Guardar
               </Button>
            </Col>
         </Row>
         {/* <pre>{JSON.stringify(workerSearchState, null, 2)}</pre>
         <pre>{JSON.stringify(workerFormState, null, 2)}</pre>
         <pre>{JSON.stringify(searchWorker, null, 2)}</pre> */}
      </ContentLayout>
   )
}
