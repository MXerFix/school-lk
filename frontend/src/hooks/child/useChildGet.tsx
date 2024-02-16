import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { get_child } from "../../api/child"
import { ChildCreateResponseType, useChildStore } from "../../store/store.child"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useChildGet() {
  
  const { setChild, child } = useChildStore()

  const {
    mutate: getChildFn,
    isPending: isChildPending,
    isSuccess: isChildSuccess,
    data,
  } = useMutation({
    mutationFn: () => get_child(),
    onSuccess: ({ data }: { data: ChildCreateResponseType }) => {
      console.log(data)
      setChild(data.child)
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { getChildFn, isChildPending, isChildSuccess, data }
}
