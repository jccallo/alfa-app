export const getYearMonthAndDay = (dateString) => {
   const date = new Date(dateString)

   // Check if the date is valid
   if (isNaN(date.getTime())) {
      return { year: '', month: '', monthName: '', day: '' } // Default values for invalid dates
   }

   const year = date.getFullYear()
   const month = date.getMonth() + 1 // Months are 0-indexed, so add 1
   const day = date.getDate()

   // Array of month names
   const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

   const monthName = monthNames[date.getMonth()] // Get month name

   return { year, month, monthName, day }
}
