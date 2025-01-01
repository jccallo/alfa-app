import { Pagination } from "./Pagination"
import { ShowingText } from "./ShowingText"

export const EasyTableFooter = ({ source, onUpdateSource }) => {
   const page           = source?.page ?? 0;
   const perPage        = source?.perPage ?? 0;
   const total          = source?.pager?.total ?? 0
   const displayedCount = source?.data?.length ?? 0

   return (
      <>
         {displayedCount > 0 && <div style={{ overflow: 'auto' }}>
            <ShowingText displayedCount={displayedCount} total={total} />
            <Pagination total={total} perPage={perPage} currentPage={page} onPageChange={(page) => onUpdateSource({ page })} />
         </div>}
      </>
   )
}
