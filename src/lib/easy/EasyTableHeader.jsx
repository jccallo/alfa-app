import { Col, Row } from 'react-bootstrap'
import { PageSizeSelector } from './PageSizeSelector'
import { SearchBox } from './SearchBox'

export const EasyTableHeader = ({ source, onUpdateSource, children }) => {
   return (
      <div>
         <Row className="g-3 align-items-center mb-3">
            <Col xs="auto">
               <PageSizeSelector pageSize={source.perPage} onPageSizeChange={(perPage) => onUpdateSource({ perPage })} />
            </Col>
            {source.query !== undefined && typeof source.query === 'string'  && (
               <Col xs="auto">
                  <SearchBox searchQuery={source.query} onSearchChange={(query) => onUpdateSource({ query })} />
               </Col>
            )}
            <Col>{children}</Col>
         </Row>
      </div>
   )
}
