import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useUserStore } from "../../store/store.user"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { useParentsGet } from "../parents/useParentsGet"
import { useAdmissionGet } from "../admission/useAdmissionGet"
import { useChildGet } from "../child/useChildGet"
import { useFetchData } from "../useFetchData"

export type RequestValidationError = {
  message: string
  errors: []
}

export function useLogin({ email, password }: { email: string; password: string }) {
  const { setUser, setIsLogin } = useUserStore()
  const navigate = useNavigate()
  const { getChildFn } = useChildGet()
  const { getAdmissionFn } = useAdmissionGet()
  const { getParentsFn } = useParentsGet()
  const {fetchData} = useFetchData()

  const {
    mutate: LogInFn,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: ({ data }: { data: UserLoginType }) => {
      setUser(data.user)
      // getChildFn()
      // getParentsFn()
      // getAdmissionFn()
      fetchData()
      setIsLogin(true)
      navigate({
        to: "/lk/home",
      })
      toast.success('Добро пожаловать!')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      console.log(error)
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { LogInFn, isPending, isSuccess, data }
}
