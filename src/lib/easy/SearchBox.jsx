export const SearchBox = ({ searchQuery, onSearchChange }) => {
   const handleSearchChange = (event) => {
      onSearchChange(event.target.value)
   }

   return <input type="search" className="form-control form-control-sm" placeholder="Buscar..." value={searchQuery} onChange={handleSearchChange} />
}
