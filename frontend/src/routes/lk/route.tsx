/* eslint-disable no-useless-escape */
import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router"
import SideBar from "../../components/SideBar"
import { useEffect } from "react"
import Header from "../../components/Header"
import { Transition } from "@headlessui/react"

export const Route = createFileRoute("/lk")({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  const { pathname } = useRouterState().location

  useEffect(() => {
    if (pathname === `/lk`) {
      navigate({
        to: "/lk/home",
      })
    }
  }, [navigate, pathname])

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
    </>
  )
}
