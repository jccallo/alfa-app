import { Table } from 'react-bootstrap'

export const EasyTableBody = ({ columns = [], source, onUpdateSource, children }) => {
   return (
      <>
         <Table responsive striped bordered hover size="sm">
            <thead>
               <tr>
                  {columns.length > 0 &&
                     columns.map((column, index) => (
                        <th key={index} className="ps-2 pe-1">
                           {column}
                        </th>
                     ))}
               </tr>
            </thead>
            <tbody>{children}</tbody>
         </Table>
      </>
   )
}
