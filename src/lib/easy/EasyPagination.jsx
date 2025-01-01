export const EasyPagination = ({ source, onUpdateSource, className, style }) => {
   const total = source?.pager?.total ?? 0
   const perPage = source?.perPage ?? 0
   const currentPage = source?.page ?? 0
   const onPageChange = (page) => onUpdateSource({ page })

   const pageCount = Math.ceil(total / perPage) // Total de páginas
   const range = 4 // Número de páginas a mostrar antes y después de la página actual

   // Función para obtener los números de página a mostrar
   const getPageNumbers = () => {
      const pageNumbers = []
      let start = Math.max(currentPage - range, 1)
      let end = Math.min(currentPage + range, pageCount)

      // Ajustar el rango si es necesario
      if (end - start < range * 2) {
         if (start === 1) {
            end = Math.min(start + range * 2, pageCount)
         } else {
            start = Math.max(end - range * 2, 1)
         }
      }

      for (let i = start; i <= end; i++) {
         pageNumbers.push(i)
      }

      return pageNumbers
   }

   // Navegar a la página seleccionada
   const navigateToPage = (page) => {
      if (page < 1 || page > pageCount) return
      onPageChange(page) // Llamar la función de cambio de página
   }

   return (
      <ul className={`pagination pagination-sm m-0 ${className}`} style={{ ...style }}>
         <li className="page-item">
            <button className="page-link" onClick={() => navigateToPage(1)} disabled={currentPage === 1}>
               &laquo;&laquo;
            </button>
         </li>
         <li className="page-item">
            <button className="page-link" onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage === 1}>
               &laquo;
            </button>
         </li>
         {getPageNumbers().map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
               <button className="page-link" key={page} onClick={() => navigateToPage(page)} disabled={page === currentPage}>
                  {page}
               </button>
            </li>
         ))}
         <li className="page-item">
            <button className="page-link" onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage === pageCount}>
               &raquo;
            </button>
         </li>
         <li className="page-item">
            <button className="page-link" onClick={() => navigateToPage(pageCount)} disabled={currentPage === pageCount}>
               &raquo;&raquo;
            </button>
         </li>
      </ul>
   )
}
