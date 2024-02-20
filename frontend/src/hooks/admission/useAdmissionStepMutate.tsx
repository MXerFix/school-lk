

import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { get_child } from "../../api/child"
import { ChildCreateResponseType, useChildStore } from "../../store/store.child"
import { AdmissionAPIInterface, AdmissionStepStatusType, AdmissionStepUserInterface, useAdmissionStore } from "../../store/store.admission"
import { get_admission, mutate_admission_step } from "../../api/admission"
import { useNavigate } from "@tanstack/react-router"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useAdmissionStepMutate() {

  const { setAdmission, setActiveStep, setStepStatus } = useAdmissionStore()
  const navigate = useNavigate()

  const {
    mutate: MutateAdmissionStepFn,
    isPending: isAdmissionMutatePending,
    isSuccess: isAdmissionMutateSuccess,
    data,
  } = useMutation({
    mutationFn: ({ status, step_index }: { status: AdmissionStepStatusType, step_index: number }) => mutate_admission_step(status, step_index),
    onSuccess: ({ data }: { data: { admission: AdmissionAPIInterface, new_step: AdmissionStepUserInterface } }) => {
      console.log(data)
      setAdmission(data.admission)
      setActiveStep(data.new_step.step_index)
      data.admission.steps?.forEach((s) => {
        setStepStatus(s.step_index, s.status)
      })
      navigate({
        to: "/lk/admission",
        search: { step: data.new_step.step_index },
      })
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { MutateAdmissionStepFn, isAdmissionMutatePending, isAdmissionMutateSuccess, data }
}
