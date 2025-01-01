import { Button, Modal } from 'react-bootstrap'
import { TableCol, TableContent, TableFooter, TableHeader, TableRow, useTable } from '../../../lib/easy'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Api } from '../../../http'
import { calculateYearsMonthsDays } from '../../../utils'

// constantes
const columns = ['ID', 'Codigo', 'Apellidos y Nombres', 'DNI', 'Edad', 'Accion']

export const WorkerSearchModal = ({ show, handleClose, searchWorker, setSearchWorker }) => {
   // estados
   const [data, setData] = useState([])
   const [pager, setPager] = useState([])

   // hooks
   const { page, perPage, query, setPage, setPerPage, setQuery } = useTable({
      onFetch: async (page, perPage, query) => await Api.get(`/workers?page=${page}&per_page=${perPage}&query=${query}`),
      onSuccess: (response) => {
         setData(response.data.data)
         setPager(response.data.pager)
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   // arrows
   const selectedStyle = (id) => (searchWorker.id === id ? 'info' : 'outline-info')
   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

   // funciones
   const selectWorker = async (id) => {
      const item = data.find((item) => item.id === id)
      if (item) {
         setSearchWorker(item)
         await delay(125)
         handleClose()
      }
   }

   const calculateWorkerAge = (fechaNacimiento) => {
      const age = calculateYearsMonthsDays(fechaNacimiento)
      return age.years === 0 ? '' : `${age.years} ${age.years === 1 ? 'año' : 'años'}`
   }

   return (
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Trabajadores</Modal.Title>
         </Modal.Header>
         <Modal.Body className="d-block">
            <TableHeader perPage={perPage} query={query} setPerPage={setPerPage} setQuery={setQuery} />
            <TableContent columns={columns}>
               {data.map((worker) => (
                  <TableRow key={worker.id} withActions={false}>
                     <TableCol>{worker.id}</TableCol>
                     <TableCol>{worker.codigo}</TableCol>
                     <TableCol>{worker.apellidos_nombres}</TableCol>
                     <TableCol>{worker.dni}</TableCol>
                     <TableCol>{calculateWorkerAge(worker.fecha_nacimiento)}</TableCol>
                     <TableCol>
                        <Button variant={selectedStyle(worker.id)} size="sm" onClick={() => selectWorker(worker.id)}>
                           <i className="bi bi-check2-circle"></i>
                        </Button>
                     </TableCol>
                  </TableRow>
               ))}
            </TableContent>
            <TableFooter total={pager.total} perPage={pager.perPage} page={page} displayedCount={data.length} setPage={setPage} />
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cancelar
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
