import { Form } from 'react-bootstrap'

export const SearchBox = ({ searchQuery, onSearchChange }) => {
   const handleSearchChange = (event) => {
      onSearchChange(event.target.value)
   }

   return <Form.Control type="text" size="sm" placeholder="Buscar..." value={searchQuery} onChange={handleSearchChange} />
}
