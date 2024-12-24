import { Button } from 'react-bootstrap'

export const TableRow = ({ id, onView, onEdit, onDelete, withActions = true, children }) => {
   return (
      <tr className="align-middle">
         {children}
         {withActions && (
            <td className="ps-2 pe-1" style={{ width: '108px' }}>
               <div style={{ width: '108px' }}>
                  <Button variant="secondary" size="sm" className="me-1" onClick={() => onView(id)}>
                     <i className="bi bi-eye"></i>
                  </Button>
                  <Button variant="primary" size="sm" className="me-1" onClick={() => onEdit(id)}>
                     <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(id)}>
                     <i className="bi bi-trash"></i>
                  </Button>
               </div>
            </td>
         )}
      </tr>
   )
}
