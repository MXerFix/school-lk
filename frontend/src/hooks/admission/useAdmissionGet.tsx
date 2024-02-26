import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { get_child } from "../../api/child"
import { ChildCreateResponseType, useChildStore } from "../../store/store.child"
import { AdmissionAPIInterface, useAdmissionStore } from "../../store/store.admission"
import { get_admission } from "../../api/admission"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useAdmissionGet() {

  const { setAdmission, setActiveStep, setStepStatus } = useAdmissionStore()

  const {
    mutate: getAdmissionFn,
    isPending: isAdmissionPending,
    isSuccess: isAdmissionSuccess,
    data,
  } = useMutation({
    mutationFn: () => get_admission(),
    onSuccess: ({ data }: { data: { admission: AdmissionAPIInterface } }) => {
      console.log(data)
      setAdmission(data.admission)
      setActiveStep(data.admission.step)
      data.admission.steps?.forEach((s) => {
        setStepStatus(s.step_index, s.status)
      })
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

  return { getAdmissionFn, isAdmissionPending, isAdmissionSuccess, data }
}
