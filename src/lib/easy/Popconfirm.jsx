import { Button, Modal } from 'react-bootstrap'

export const Popconfirm = ({ show, setShow, title, description, onConfirm = () => {}, onCancel = () => {} }) => {
   return (
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{description}</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
               No
            </Button>
            <Button variant="primary" onClick={onConfirm}>
               Si
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
