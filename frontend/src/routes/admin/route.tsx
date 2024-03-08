import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router"
import SideBar from "../../components/SideBar"
import Header from "../../components/Header"
import { useEffect } from "react"

export const Route = createFileRoute("/admin")({
  component: Admin
})


function Admin() {

  const navigate = useNavigate()
  const { pathname } = useRouterState().location
  useEffect(() => {
    if (pathname === `/admin`) {
      navigate({
        to: "/admin/main",
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