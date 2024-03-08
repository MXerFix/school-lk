

import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { get_child } from "../../api/child"
import { ChildCreateResponseType, useChildStore } from "../../store/store.child"
import { AdmissionAPIInterface, useAdmissionStore } from "../../store/store.admission"
import { get_admission, get_all_admissions } from "../../api/admission"
import { AdmissionWithUserInterface, useAdminStore } from "../../store/store.admin"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useAdmissionGetAll() {

  const { setAdmissions } = useAdminStore()

  const {
    mutate: getAdmissionsFn,
    isPending: isAdmissionsPending,
    isSuccess: isAdmissionsSuccess,
    data,
  } = useMutation({
    mutationFn: () => get_all_admissions(),
    onSuccess: ({ data }: { data: { admissions: AdmissionWithUserInterface[] } }) => {
      console.log(data)
      if (data.admissions) {
        setAdmissions(data.admissions)
      }
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message, {
          id: error.response?.data.message
        })
      } else {
        toast.error(error.message, {
          id: error.message
        })
      }
    },
  })

  return { getAdmissionsFn, isAdmissionsPending, isAdmissionsSuccess, data }
}
