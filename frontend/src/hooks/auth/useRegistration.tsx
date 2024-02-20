import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login, registration } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from 'js-cookie'
import { useUserStore } from "../../store/store.user"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { RequestValidationError } from "./useLogin"
import { useFetchData } from "../useFetchData"

export function useRegistration({ email, password }: { email: string; password: string }) {

  const { setUser, setIsLogin } = useUserStore()
  const navigate = useNavigate()
  const { fetchData } = useFetchData()

  const {
    mutate: SignUpFn,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () => registration(email, password),
    onSuccess: ({ data }: { data: UserLoginType }) => {
      setUser(data.user)
      setIsLogin(true)
      navigate({
        to: "/lk/home",
      })
      toast.success('Добро пожаловать!')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { SignUpFn, isPending, isSuccess }
}
