export const calculateDaysBetweenDates = (startDate, endDate) => {
   const date1 = new Date(startDate)
   const date2 = new Date(endDate)

   // Validate dates
   if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return ''
   }

   // Difference in milliseconds
   const differenceInMilliseconds = date2 - date1

   // Convert the difference to days
   const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

   return Math.abs(differenceInDays) // Absolute value to handle reversed date order
}
