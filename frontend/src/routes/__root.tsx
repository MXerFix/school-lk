import {
  Outlet,
  createRootRoute,
  useNavigate,
  useRouterState,
  useSearch,
} from "@tanstack/react-router"
import { useThemeStore } from "../store/store.theme"
import toast, { Toaster } from "react-hot-toast"
import SideBar from "../components/SideBar"
import { useUserStore } from "../store/store.user"
import { useRefresh } from "../hooks/auth/useRefresh"
import { useEffect, useState } from "react"
import { useChildGet } from "../hooks/child/useChildGet"
import { useParentsGet } from "../hooks/parents/useParentsGet"
import { Transition } from "@headlessui/react"
import { useAdmissionStore } from "../store/store.admission"
import { useAdmissionGet } from "../hooks/admission/useAdmissionGet"
import NotFound from "../pages/NotFound"

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  const { theme } = useThemeStore()
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useRouterState().location

  const { RefreshAuthFn, isRefreshSuccess, isRefreshPending } = useRefresh()
  const { getChildFn, isChildSuccess, isChildPending } = useChildGet()
  const { getParentsFn, isParentSuccess, isParentPending } = useParentsGet()
  const { getAdmissionFn, isAdmissionPending } = useAdmissionGet()

  console.log(import.meta.env.DEV)

  useEffect(() => {
    RefreshAuthFn()
    // if (pathname !== "/auth" && pathname !== "/registration") {
    //   getChildFn()
    //   getParentsFn()
    //   getAdmissionFn()
    // }
  }, [RefreshAuthFn])

  // useEffect(() => {
  //   if (step > activeStep) {
  //     navigate({
  //       to: "/lk/admission",
  //       search: { step: activeStep },
  //     })
  //   }
  // }, [activeStep, navigate, step, isChildPending, isParentPending, isRefreshPending])

  useEffect(() => {
    if (!isRefreshPending && !isChildPending && !isParentPending && !isAdmissionPending) {
      setIsLoading((prev) => false)
    } else {
      setIsLoading((prev) => true)
    }
  }, [isAdmissionPending, isChildPending, isParentPending, isRefreshPending])

  return (
    <div
      className='__root'
      data-theme={theme}>
      <div className='wrapper'>
        <Transition
          appear
          unmount={false}
          show={isLoading}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='w-screen h-screen absolute flex bg-base-100 z-50 items-center justify-center'>
            <span className='loading loading-spinner loading-lg text-info'></span>
          </div>
        </Transition>
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
          show={!isLoading}
          className={"transition-opacity duration-500"}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Outlet />
        </Transition>
      </div>
    </div>
  )
}
