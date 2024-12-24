import { Col, Row } from 'react-bootstrap'
import { PageSizeSelector } from './PageSizeSelector'
import { SearchBox } from './SearchBox'

export const TableHeader = ({ perPage, setPerPage, query, setQuery, children }) => {
   return (
      <Row className="g-3 align-items-center mb-3">
         <Col xs="auto">
            <PageSizeSelector pageSize={perPage} onPageSizeChange={(pageSize) => setPerPage(pageSize)} />
         </Col>
         <Col xs="auto">
            <SearchBox searchQuery={query} onSearchChange={(query) => setQuery(query)} />
         </Col>
         <Col>{children}</Col>
      </Row>
   )
}
