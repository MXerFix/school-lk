import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useUserStore } from "../../store/store.user"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { create_child } from "../../api/child"
import { ChildCreateResponseType, ChildCreateType, useChildStore } from "../../store/store.child"
import { useAdmissionStore } from "../../store/store.admission"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useChildCreate() {
  
  const { setChild } = useChildStore()
  const { setActiveStep, setAdmission } = useAdmissionStore()

  const {
    mutate: createChildFn,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: (formData: FormData) => create_child(formData),
    onSuccess: ({ data }: { data: ChildCreateResponseType }) => {
      setChild(data.child)
      setAdmission(data.admission)
      setActiveStep(data.step.step_index)
      toast.dismiss('check_child_data')
      toast.success("Данные успешно сохранены")
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('check_child_data')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { createChildFn, isPending, isSuccess, data }
}
