import { Bell, LogOut, Mail, Search } from "lucide-react"
import React, { useState } from "react"
import ThemeToggler from "../ui/ThemeToggler"
import { useNavigate } from "@tanstack/react-router"
import { useLogout } from "../hooks/auth/useLogout"
import { Transition } from "@headlessui/react"

const Header = () => {
  const navigate = useNavigate()
  const { LogOutFn } = useLogout()

  const [isAlertsOpen, setIsAlertsOpen] = useState(false)

  const logoutHandler = () => {
    LogOutFn()
    return navigate({
      to: "/auth",
    })
  }

  return (
    <div className='text-base-content flex flex-row items-center justify-between h-12 col-span-3 pointer-events-auto'>
      <div>
        <div className='input transition focus-within:outline-none bg-base-200 flex items-center justify-between'>
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent h-full'
          />
          <Search />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between gap-16'>
          <div className='flex items-center justify-start gap-2'>
            <ThemeToggler
              className=' nav-icon-btn tooltip tooltip-info tooltip-bottom '
              data-tip='Тема'
            />
            <button
              className=' nav-icon-btn tooltip tooltip-bottom'
              data-tip='Сообщения'>
              <Mail />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                className={` nav-icon-btn ${!isAlertsOpen && "tooltip"} ${isAlertsOpen && "bg-base-300"} tooltip-bottom`}
                data-tip='Уведомления'>
                <Bell />
              </button>
              <Transition
                className={
                  "absolute top-[125%] right-0 z-10 transition origin-top-right duration-100 ease-in bg-base-200 rounded-xl border w-96 h-96"
                }
                show={isAlertsOpen}
                enterFrom='transform scale-50 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-50 opacity-0'></Transition>
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <button
              onClick={logoutHandler}
              className=' nav-icon-btn nav-icon-btn-logout tooltip tooltip-bottom'
              data-tip='Выйти'>
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
