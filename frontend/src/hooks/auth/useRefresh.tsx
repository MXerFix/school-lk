/* eslint-disable no-useless-escape */
import { useMutation } from "@tanstack/react-query"
import { UserLoginType } from "../../api/api"
import { login, refresh } from "../../api/auth"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useUserStore } from "../../store/store.user"
import toast from "react-hot-toast"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useFetchData } from "../useFetchData"

export function useRefresh() {
  const { setUser, setIsLogin } = useUserStore()
  const navigate = useNavigate()
  const auth_path = useRouterState().location.pathname === "/auth\/?"
  const reg_path = useRouterState().location.pathname === "/registration\/?"
  const { pathname } = useRouterState().location
  const { fetchData } = useFetchData()

  const {
    mutate: RefreshAuthFn,
    isPending: isRefreshPending,
    isSuccess: isRefreshSuccess,
  } = useMutation({
    mutationFn: () => refresh(),
    onSuccess: ({ data }: { data: UserLoginType }) => {
      setUser(data.user)
      setIsLogin(true)
      fetchData()
      // toast.success("Вы успешно авторизованы")
      if (auth_path || pathname === '' || reg_path) {
        console.log(1)
        navigate({
          to: "/lk/home",
        })
      }
    },
    onError: (error: AxiosError) => {
      if (!auth_path && !reg_path) {
        toast.error("Пожалуйста, авторизуйтесь!")
        navigate({
          to: "/auth",
        })
      }
      if (error.response?.status !== 401) {
        toast.error(error.message)
      }
    },
  })

  return { RefreshAuthFn, isRefreshPending, isRefreshSuccess }
}
