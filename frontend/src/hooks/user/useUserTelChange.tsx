import { useMutation } from "@tanstack/react-query"
import { change_tel } from "../../api/user"
import { useUserStore } from "../../store/store.user"
import { UserDataLoginType } from "../../api/api"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { RequestValidationError } from "../admission/useAdmissionGet"

export const useUserTelChange = () => {

  const {setUser} = useUserStore()

  const { data, isPending: isTelChangePending, isSuccess: isTelChangeSuccess, mutate: changeUserTelFn } = useMutation({
    mutationFn: (tel: string) => change_tel(tel),
    onSuccess: ({data}: {data: {user: UserDataLoginType}}) => {
      setUser(data.user)
      toast.dismiss('change_user_tel')
      toast.success('Номер телефона успешно изменен')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('change_user_tel')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { data, isTelChangePending, isTelChangeSuccess, changeUserTelFn }

}
