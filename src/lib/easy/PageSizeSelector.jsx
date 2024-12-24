import { Form } from 'react-bootstrap';

export const PageSizeSelector = ({ pageSize, onPageSizeChange }) => {
  const handlePageSizeChange = (event) => {
    onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <Form.Select size="sm" value={pageSize} onChange={handlePageSizeChange}>
      <option value={15}>15</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </Form.Select>
  );
};
