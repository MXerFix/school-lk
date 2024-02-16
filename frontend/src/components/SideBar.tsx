import React from "react"
import { useUserStore } from "../store/store.user"
import { Coins, Home, Lock, Palette, ScrollText, TestTube2, User } from "lucide-react"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import classNames from "classnames"
import { useChildStore } from "../store/store.child"

const SideBar = () => {
  const { user } = useUserStore()
  const { child } = useChildStore()
  const navigate = useNavigate()
  const { pathname } = useRouterState().location

  const navigateToProfileHandler = () => {
    return navigate({
      to: "/lk/profile",
    })
  }

  return (
    <div className='sidebar row-span-12 w-full h-auto rounded-3xl pointer-events-auto p-4'>
      <button
        onClick={navigateToProfileHandler}
        className='sidebar-profile flex items-center justify-start gap-2 max-w-full w-full rounded-2xl px-1 py-2 mb-16 transition border border-transparent hover:border-base-100'>
        <div className='sidebar-profile-avatar bg-base-200 min-w-20 w-20 h-20 rounded-full flex items-center justify-center overflow-hidden'>
          {user.profile_img ? (
            <img
              className="profile-img"
              src={`${import.meta.env.VITE_API_URL}/static/img/${user.profile_img}`}
              alt=''
            />
          ) : child?.img ? (
            <img
              className="profile-img"
              src={`${import.meta.env.VITE_API_URL}/static/img/${child.img}`}
              alt=''
            />
          ) : (
            <User />
          )}
        </div>
        <p className='max-w-full text-white'>
          {" "}
          {/* {user.username.slice(0, 16)}
          {user.username.slice(0, 16) !== user.username && "..."}{" "} */}
          {user.username.split('@')[0]}
        </p>
      </button>
      <div className='sidebar-menu flex flex-col items-start justify-start gap-2'>
        <Link
          to='/lk/home'
          className={classNames(
            "sidebar-menu-item",
            pathname === "/lk/home" && "sidebar-menu-item-active"
          )}>
          <Home className={"w-5 h-5"} />
          Главная
        </Link>
        <Link
          to='/lk/admission'
          className={classNames(
            "sidebar-menu-item",
            pathname === "/lk/admission" && "sidebar-menu-item-active"
          )}>
          <ScrollText className={"w-5 h-5"} />
          Приемная кампания
        </Link>
        <Link
          disabled
          to='/lk/me-explorer'
          className={classNames(
            "sidebar-menu-item sidebar-menu-item-wip",
            pathname === "/lk/me-explorer" && "sidebar-menu-item-active"
          )}
          data-tip="В разработке...">
          <TestTube2 className='w-5 h-5' />
          <p className="tooltip tooltip-bottom tooltip-warning" data-tip="В разработке..."> Я-Исследователь </p>
        </Link>
        <Link
          disabled
          to='/lk/sections'
          className={classNames(
            "sidebar-menu-item sidebar-menu-item-wip",
            pathname === "/lk/sections" && "sidebar-menu-item-active"
          )}
          data-tip="В разработке...">
          <Palette className='w-5 h-5' />
          <p className="tooltip tooltip-bottom tooltip-warning" data-tip="В разработке..."> Кружки </p>
        </Link>
        <Link
          disabled
          to='/lk/payment'
          className={classNames(
            "sidebar-menu-item sidebar-menu-item-wip",
            pathname === "/lk/payment" && "sidebar-menu-item-active"
          )}
          data-tip="В разработке...">
          <Coins className='w-5 h-5' />
          <p className="tooltip tooltip-bottom tooltip-warning" data-tip="В разработке..."> Оплата </p>
        </Link>
        {user.role_id < 3 && (
          <Link
            to='/admin'
            className={classNames(
              "sidebar-menu-item",
              pathname === "/admin" && "sidebar-menu-item-active"
            )}>
            <Lock className='w-5 h-5' />
            Админ панель
          </Link>
        )}
      </div>
    </div>
  )
}

export default SideBar
