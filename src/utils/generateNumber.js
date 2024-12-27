export const generateNumber = (digits) => {
   // Check if 'digits' is a valid number and greater than or equal to 1
   if (isNaN(digits) || digits < 1 || !Number.isInteger(digits)) {
      throw new Error('The number of digits must be an integer greater than or equal to 1.')
   }

   const min = Math.pow(10, digits - 1) // Minimum number with 'digits' digits
   const max = Math.pow(10, digits) - 1 // Maximum number with 'digits' digits

   return Math.floor(Math.random() * (max - min + 1)) + min
}

// console.log(generateNumber(8));  // Generate a 8-digit number
// console.log(generateNumber(9));  // Generate a 9-digit number
// console.log(generateNumber(5));  // Generate a 5-digit number
// console.log(generateNumber(12)); // Generate a 12-digit number
