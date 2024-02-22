import { useMutation } from "@tanstack/react-query"
import { activate_user, change_tel } from "../../api/user"
import { useUserStore } from "../../store/store.user"
import { UserDataLoginType } from "../../api/api"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { RequestValidationError } from "../admission/useAdmissionGet"

export const useUserActivate = () => {

  const {setUser} = useUserStore()

  const { data, isPending: isUserActivatePending, isSuccess: isUserActivateSuccess, mutate: activateUserFn } = useMutation({
    mutationFn: (link: string) => activate_user(link),
    onSuccess: ({data}: {data: {user: UserDataLoginType}}) => {
      setUser(data.user)
      toast.dismiss('user_activate')
      toast.success('Аккаунт успешно активирован')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('user_activate')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { data, isUserActivatePending, isUserActivateSuccess, activateUserFn }

}
