import { useState } from 'react'

export const useForm = (initialForm = {}) => {
   const [formState, setFormState] = useState(initialForm)

   const onInputChange = ({ target }) => {
      const { name, value } = target
      setFormState({
         ...formState,
         [name]: value,
      })
   }

   const onUpdateForm = (newForm) => {
      setFormState(newForm)
   }

   const onResetForm = () => {
      setFormState(initialForm)
   }

   const formAction = {
      onInputChange,
      onResetForm,
      onUpdateForm,
   }

   return {
      formState,
      formAction,
      ...formState,
      ...formAction,
   }
}
