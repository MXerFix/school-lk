import axios, { AxiosResponse } from "axios"
import $v1 from "./index"
import { UserLoginType } from "./api"

export const login = async (email: string, password: string) => {
  const res: AxiosResponse<UserLoginType> = await $v1.post("/login", { email, password })
  return res
}

export const registration = async (email: string, password: string) => {
  const res: AxiosResponse<UserLoginType> = await $v1.post("/signup", { email, password })
  return res
}

export const logout = async () => {
  const res: AxiosResponse<UserLoginType> = await $v1.post("/logout")
  return res
}

export const refresh = async () => {
  const res: AxiosResponse<UserLoginType> = await axios.get(
    `${import.meta.env.VITE_API_URL ?? "http://localhost:7777"}/api/v1/refresh`,
    { withCredentials: true }
  )
  return res
}
