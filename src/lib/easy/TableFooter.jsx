import { Pagination } from "./Pagination"
import { ShowingText } from "./ShowingText"

export const TableFooter = ({ perPage, page, setPage, displayedCount, total }) => {
   return (
      <>
         <div style={{ overflow: 'auto' }}>
            <ShowingText
               displayedCount={displayedCount}
               total={total}
            />
            <Pagination
               total={total}
               perPage={perPage}
               currentPage={page}
               onPageChange={(page) => setPage(page)}
            />
         </div>
      </>
   )
}