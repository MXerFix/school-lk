import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ParentCreateResponseType, useParentsStore } from "../../store/store.parents"
import { get_parents } from "../../api/parents"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useParentsGet() {
  
  const { setParents } = useParentsStore()

  const {
    mutate: getParentsFn,
    isPending: isParentPending,
    isSuccess: isParentSuccess,
    data,
  } = useMutation({
    mutationFn: () => get_parents(),
    onSuccess: ({ data }: { data: ParentCreateResponseType }) => {
      console.log(data)
      setParents(data.parents)
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { getParentsFn, isParentPending, isParentSuccess, data }
}
