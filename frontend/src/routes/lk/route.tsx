/* eslint-disable no-useless-escape */
import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router"
import SideBar from "../../components/SideBar"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { Transition } from "@headlessui/react"
import { useUserStore } from "../../store/store.user"
import { Link } from "lucide-react"
import { useUserActivate } from "../../hooks/user/useUserActivate"
import toast from "react-hot-toast"

export const Route = createFileRoute("/lk")({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  const { pathname } = useRouterState().location
  const { user } = useUserStore()
  const [link, setLink] = useState("")
  const { activateUserFn, isUserActivatePending } = useUserActivate()
  useEffect(() => {
    if (pathname === `/lk`) {
      navigate({
        to: "/lk/home",
      })
    }
  }, [navigate, pathname])

  console.log(link.split("/").slice(-1)[0].split("=")[1])

  const activateUser = async () => {
    if (link && !isUserActivatePending) {
      toast.loading("Проверяем ссылку...", {
        id: "user_activate",
      })
      activateUserFn(link.split("/").slice(-1)[0].split("=")[1])
    } else {
      toast.error("Некорректная ссылка")
    }
  }

  return (
    <>
      <div className='w-full p-12 grid grid-cols-4 gap-12 fixed pointer-events-none '>
        <SideBar />
      </div>
      <div className='w-full p-12 grid grid-cols-4 gap-12 pointer-events-auto'>
        <div></div>
        <Header />
        <div></div>
        <Outlet />
      </div>
      {user?.is_verified ? (
        <></>
      ) : (
        <dialog
          id='not_verified_dialog'
          className='modal modal-open'>
          <div className='modal-box max-w-2xl'>
            <h3 className='font-bold text-lg mb-2'>Добро пожаловать!</h3>
            <p className='py-1'>
              Кажется, вы все еще не активировали аккаунт по ссылке на электронной почте. Вы можете
              сделать это прямо сейчас, перейдя по ссылке из письма или вставив её в поле ниже.
            </p>
            <label className='input input-bordered flex items-center gap-2 w-full my-2 mb-6'>
              <Link />
              <input
                className='grow bg-transparent w-full'
                type='text'
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
            <div className='flex items-center justify-end'>
              <button onClick={activateUser} className='btn btn-warning'>
                {isUserActivatePending && (
                  <div className='absolute flex items-center justify-center w-full h-full'>
                    <span className='loading loading-spinner loading-md'></span>
                  </div>
                )}
                <span className={isUserActivatePending ? "opacity-0" : ""}>Активировать</span>
              </button>
            </div>
            {/* <div className='modal-action'>
              <form method='dialog'>
                <button className='btn'>Close</button>
              </form>
            </div> */}
          </div>
        </dialog>
      )}
    </>
  )
}
