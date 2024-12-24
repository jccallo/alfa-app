export const SearchWorker = {
   id               : '',
   codigo           : '',
   apellidos_nombres: '',
   dni              : '',
   fecha_nacimiento : '',
   fecha_ingreso    : '',
   foto             : null,
   occupation       : {
      id    : '',
      nombre: '',
   },
   worksite: {
      id    : '',
      nombre: '',
   },
}

export const WorkerFormState = {
   diagnostico         : '',
   transferencia       : '',
   nro_documento       : '',
   fecha_inicio        : '',
   fecha_final         : '',
   total_dias          : '',
   observaciones       : '',
   care_center_id      : '',
   contingency_id      : '',
   type_medical_care_id: '',
}

export const WorkerSearchState = {
   codigo: '',
   dni   : '',
}
