export const calculateYearsMonthsDays = (birthDate) => {
   const today = new Date()
   const birth = new Date(birthDate)

   if (isNaN(birth.getTime())) {
      return { years: 0, months: 0, days: 0 }
   }

   let years = today.getFullYear() - birth.getFullYear()
   let months = today.getMonth() - birth.getMonth()
   let days = today.getDate() - birth.getDate()

   // Adjust if the current month is earlier than the birth month
   if (months < 0) {
      years--
      months += 12
   }

   // Adjust if the current day is earlier than the birth day
   if (days < 0) {
      months--
      const lastDayPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
      days += lastDayPreviousMonth
   }

   return { years, months, days }
}
