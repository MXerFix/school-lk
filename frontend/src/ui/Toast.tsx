import * as React from "react"
import * as Toast from "@radix-ui/react-toast"
import { Transition } from "@headlessui/react"

export type ToastVariantsType = "alert-success" | "alert-error" | "alert-warning" | "alert-info"

export type ToastComponentType = {
  message: string
  type: ToastVariantsType
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToastComponent = ({ message, type, open, setOpen }: ToastComponentType) => {
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    if (open) {
      timerRef.current = window.setTimeout(() => {
        setOpen(() => false)
      }, 10000)
    }
  }, [setOpen, open])

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
      {/* <Toast.Root
        open={open}
        onOpenChange={setOpen}
        onClick={() => setOpen(!open)}> */}
      <div className='toast'>
        <Transition
          onClick={() => setOpen(() => false)}
          show={open}
          leave='transition-all origin-bottom duration-200 ease-in'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-50 opacity-0'>
          <div className={`alert ${type}`}>
            <span>{message}</span>
          </div>
        </Transition>
      </div>
      {/* </Toast.Root>
      <Toast.Viewport /> */}
    </>
  )
}
