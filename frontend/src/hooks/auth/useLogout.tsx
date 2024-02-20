import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login, logout } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from 'js-cookie'
import { AUTH_ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "../../consts"
import { useNavigate } from "@tanstack/react-router"
import { initUser, useUserStore } from "../../store/store.user"
import toast from "react-hot-toast"
import { initSteps, useAdmissionStore } from "../../store/store.admission"
import { useChildStore } from "../../store/store.child"
import { useParentsStore } from "../../store/store.parents"
import { useInitialStore } from "../../store/store"

export function useLogout() {

  const { setUser, setIsLogin } = useUserStore()
  const { setActiveStep, setAdmission, setSteps } = useAdmissionStore()
  const { setChild } = useChildStore()
  const { setParents } = useParentsStore()
  const navigate = useNavigate()

  const { resetStore } = useInitialStore()

  const {
    mutate: LogOutFn,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      Cookies.remove(AUTH_REFRESH_TOKEN)
      Cookies.remove(AUTH_ACCESS_TOKEN)
      resetStore()
      // setUser(initUser)
      // setParents([])
      // setChild(null)
      // setAdmission(null)
      // setActiveStep(-2)
      // setSteps(initSteps)
      // setIsLogin(false)
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
