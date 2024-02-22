import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ParentCreateResponseType, ParentCreateType, useParentsStore } from "../../store/store.parents"
import { create_parent } from "../../api/parents"
import { useChildStore } from "../../store/store.child"
import { useUserStore } from "../../store/store.user"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useParentCreate(parent: ParentCreateType) {
  
  const { setParents } = useParentsStore()
  const { child } = useChildStore()
  const { setUser } = useUserStore()

  const {
    mutate: createParentFn,
    isPending,
    isSuccess,
    data,
    isIdle,
  } = useMutation({
    mutationFn: () => {
      if (child) {
        return create_parent(parent)
      } else {
        toast.error('Необходимо заполнить данные поступающего')
        return Promise.reject('Необходимо заполнить данные поступающего')
      }
    },
    onSuccess: ({ data }: { data: ParentCreateResponseType }) => {
      setParents(data.parents)
      if (data.user) {
        setUser(data.user)
      }
      toast.dismiss('check_parent_data')
      toast.success("Данные успешно сохранены")
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('check_parent_data')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { createParentFn, isPending, isSuccess, data, isIdle }
}
