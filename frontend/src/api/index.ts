import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { UserLoginType } from "./api"
import { AUTH_ACCESS_TOKEN } from "../consts"

const $v1 = axios.create({
  baseURL: "http://localhost:7777/api/v1",
  withCredentials: true,
  timeout: 15000
})

$v1.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    config.headers.Authorization = `Bearer ${Cookies.get(AUTH_ACCESS_TOKEN)}`
    return config
  }
)

$v1.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
      console.log(error.config)
      originalRequest._isRetry = true
      try {
        const response: AxiosResponse<UserLoginType> = await axios.get("http://localhost:7777/api/v1/refresh", { withCredentials: true })
        return $v1.request(originalRequest)
      } catch (error) {
        console.log('unauthorized')
      }
    }
    throw error
  }
)

export default $v1
