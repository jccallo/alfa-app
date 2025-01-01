export const EasyShowingText = ({ source, className, style }) => {
   const total = source?.pager?.total ?? 0
   const displayedCount = source?.data?.length ?? 0
   return (
      <div className={`${className}`} style={{ ...style }}>
         Mostrando {displayedCount} registros de {total} en total
      </div>
   )
}
