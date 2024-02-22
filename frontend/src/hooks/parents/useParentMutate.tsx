import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useUserStore } from "../../store/store.user"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { mutate_child } from "../../api/child"
import { ChildCreateResponseType, ChildCreateType, useChildStore } from "../../store/store.child"
import { ParentCreateResponseType, useParentsStore } from "../../store/store.parents"
import { mutate_parents } from "../../api/parents"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useParentMutate() {
  
  const { setParents } = useParentsStore()

  const {
    mutate: mutateParentFn,
    isPending: isParentMutatePending,
    isSuccess: isParentMutateSuccess,
    data,
  } = useMutation({
    mutationFn: (formData: FormData) => mutate_parents(formData),
    onSuccess: ({ data }: { data: ParentCreateResponseType }) => {
      setParents(data.parents)
      toast.dismiss('edit_parent_data')
      toast.success("Данные успешно сохранены")
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('edit_parent_data')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { mutateParentFn, isParentMutatePending, isParentMutateSuccess, data }
}
