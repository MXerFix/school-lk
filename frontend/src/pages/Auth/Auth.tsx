/* eslint-disable no-useless-escape */
import { useCallback, useEffect, useState } from "react"
import AuthBgLeft from "../../assets/auth_bg_1"
import AuthBgRight from "../../assets/auth_bg_2"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import * as Toast from "@radix-ui/react-toast"
import { ToastComponent, ToastVariantsType } from "../../ui/Toast"
import ThemeToggler from "../../ui/ThemeToggler"
import { useLogin } from "../../hooks/auth/useLogin"
import { useUserStore } from "../../store/store.user"
import { useRegistration } from "../../hooks/auth/useRegistration"
import toast from "react-hot-toast"
import { useThemeStore } from "../../store/store.theme"
import SupportMenu from "../../ui/SupportMenu"
const Auth = () => {
  const { toggleTheme } = useThemeStore()
  const { pathname } = useRouterState().location
  const navigate = useNavigate()
  const is_registration = pathname === "/registration\/?"
  // const [pending, setPending] = useState(false)
  // const [toast, setToast] = useState(false)
  // const [toastMessage, setToastMessage] = useState("")
  // const [toastType, setToastType] = useState<ToastVariantsType>("alert-info")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")

  const login = useLogin({ email, password })
  const registration = useRegistration({ email, password })

  const onClickHandler = useCallback(() => {
    if (!is_registration) {
      if (email && password && password.length >= 8) {
        login.LogInFn()
      } else {
        toast.error("Некорректно введен логин или пароль")
      }
    } else {
      if (email && password && password.length >= 8) {
        if (password === secondPassword) {
          registration.SignUpFn()
        } else {
          toast.error("Пароли не совпадают")
        }
      } else {
        toast.error("Некорректно введен логин или пароль")
      }
    }
  }, [email, is_registration, login, password, registration, secondPassword])

  return (
    <Toast.Provider swipeDirection='right'>
      <div className='w-full h-screen flex items-center justify-center relative overflow-hidden'>
        <SupportMenu className=' absolute bottom-8 right-8' />
        <span className='absolute right-0 top-0'>
          <AuthBgRight />
        </span>
        <AuthBgLeft className='absolute left-0 min-h-screen' />
        <div className='w-[360px] flex flex-col items-center justify-start'>
          <div className='flex flex-col items-center justify-center mb-2'>
            <h1 className='text-5xl font-bold w-max mb-2'>
              {is_registration ? "Регистрация" : "Вход в личный кабинет"}
            </h1>
            <span className='text-xl'>
              {" "}
              или{" "}
              {is_registration ? (
                <Link
                  className='underline underline-offset-2'
                  to='/auth'>
                  {" "}
                  вход в личный кабинет{" "}
                </Link>
              ) : (
                <Link
                  className='underline underline-offset-2'
                  to='/registration'>
                  {" "}
                  регистрация{" "}
                </Link>
              )}
            </span>
          </div>
          <form className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            <label className='form-control w-full max-w-xs mb-2'>
              <div className='label'>
                <span className='label-text'>Email</span>
              </div>
              <input
                type='email'
                placeholder='Электронная почта'
                className='input input-bordered w-full max-w-xs'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <input
                type='password'
                placeholder='Пароль'
                className='input input-bordered w-full max-w-xs mb-1'
                minLength={8}
                maxLength={32}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {is_registration && (
                <input
                  type='password'
                  placeholder='Повторите пароль'
                  className='input input-bordered w-full max-w-xs'
                  minLength={8}
                  maxLength={32}
                  value={secondPassword}
                  onChange={(e) => setSecondPassword(e.target.value)}
                />
              )}
              <button
                onClick={onClickHandler}
                className='btn btn-secondary mt-4 text-xl'>
                {login.isPending || registration.isPending ? (
                  <span className='loading loading-spinner loading-md'></span>
                ) : (
                  <>{is_registration ? "Зарегистрироваться" : "Войти"}</>
                )}
              </button>
            </label>
          </form>
        </div>
      </div>
      {/* <ToastComponent
        open={toast}
        setOpen={setToast}
        message={toastMessage}
        type={toastType}
      /> */}
    </Toast.Provider>
  )
}

export default Auth
