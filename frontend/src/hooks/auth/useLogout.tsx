import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login, logout } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from 'js-cookie'
import { AUTH_ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "../../consts"
import { useNavigate } from "@tanstack/react-router"
import { initUser, useUserStore } from "../../store/store.user"
import toast from "react-hot-toast"

export function useLogout() {

  const { setUser, setIsLogin } = useUserStore()
  const navigate = useNavigate()

  const {
    mutate: LogOutFn,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      Cookies.remove(AUTH_REFRESH_TOKEN)
      Cookies.remove(AUTH_ACCESS_TOKEN)
      setUser(initUser)
      setIsLogin(false)
      navigate({
        to: '/auth'
      })
    },
    onError: (error: AxiosError) => {
      toast.error(error.message)
    },
  })

  return { LogOutFn, isPending, isSuccess }
}
