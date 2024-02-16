import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useUserStore } from "../../store/store.user"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useLogin({ email, password }: { email: string; password: string }) {
  const { setUser, setIsLogin } = useUserStore()
  const navigate = useNavigate()

  const {
    mutate: LogInFn,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: ({ data }: { data: UserLoginType }) => {
      setUser(data.user)
      setIsLogin(true)
      navigate({
        to: "/lk/home",
      })
      toast.success('Добро пожаловать!')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      // console.log(error)
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { LogInFn, isPending, isSuccess, data }
}
