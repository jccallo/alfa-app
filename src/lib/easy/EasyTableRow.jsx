import { Button } from 'react-bootstrap'

export const EasyTableRow = ({ item, actions, children }) => {
   return (
      <>
         <tr className="align-middle">
            {children}
            {actions && (
               <td className="ps-2 pe-1" style={{ width: '108px' }}>
                  <div style={{ width: '108px' }}>
                     <Button variant="secondary" size="sm" className="me-1" onClick={() => actions.onView(item)}>
                        <i className="bi bi-eye"></i>
                     </Button>
                     <Button variant="primary" size="sm" className="me-1" onClick={() => actions.onEdit(item)}>
                        <i className="bi bi-pencil"></i>
                     </Button>
                     <Button variant="danger" size="sm" onClick={() => actions.onDelete(item)}>
                        <i className="bi bi-trash"></i>
                     </Button>
                  </div>
               </td>
            )}
         </tr>
      </>
   )
}
