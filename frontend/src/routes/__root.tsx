import { Outlet, createRootRoute, useNavigate, useRouterState } from "@tanstack/react-router"
import { useThemeStore } from "../store/store.theme"
import toast, { Toaster } from "react-hot-toast"
import SideBar from "../components/SideBar"
import { useUserStore } from "../store/store.user"
import { useRefresh } from "../hooks/auth/useRefresh"
import { useEffect, useState } from "react"
import { useChildGet } from "../hooks/child/useChildGet"
import { useParentsGet } from "../hooks/parents/useParentsGet"
import { Transition } from "@headlessui/react"

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const { theme } = useThemeStore()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { RefreshAuthFn, isRefreshSuccess, isRefreshPending } = useRefresh()
  const { getChildFn, isChildSuccess, isChildPending } = useChildGet()
  const { getParentsFn, isParentSuccess, isParentPending } = useParentsGet()

  useEffect(() => {
    RefreshAuthFn()
    getChildFn()
    getParentsFn()
  }, [RefreshAuthFn, getChildFn, getParentsFn])

  useEffect(() => {
    if (isRefreshSuccess && isChildSuccess && isParentSuccess) {
      setIsLoading(false)
    }
  }, [isChildSuccess, isParentSuccess, isRefreshSuccess])

  return (
    <div
      className='__root'
      data-theme={theme}>
      <div className='wrapper'>
        <Toaster
          position='bottom-right'
          toastOptions={{
            success: {
              style: {
                backgroundColor: "#00AA6E",
                color: "white",
              },
            },
            error: {
              style: {
                backgroundColor: "#FC3737",
                color: "white",
              },
            },
          }}
        />
        <Transition
          appear
          unmount={false}
          show={!isLoading && !isRefreshPending && !isChildPending && !isParentPending}
          className={"transition-opacity duration-500"}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Outlet />
        </Transition>
        <Transition
          appear
          unmount={false}
          show={isLoading || isRefreshPending || isChildPending || isParentPending}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='w-screen h-screen absolute flex bg-base-100 z-20 items-center justify-center'>
            <span className='loading loading-spinner loading-lg text-info'></span>
          </div>
        </Transition>
      </div>
    </div>
  )
}
