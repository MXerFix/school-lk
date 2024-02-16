import { Transition } from "@headlessui/react"
import { CheckCircle, CheckCircle2 } from "lucide-react"
import React, { ReactNode } from "react"

type ModalCollapseTitleType = {
  children?: ReactNode
  isCompleted?: boolean
}

const ModalCollapseTitle = ({ children = "Title", isCompleted }: ModalCollapseTitleType) => {
  return (
    <span className='flex items-center justify-start gap-1.5'>
      {children}
      <Transition
        show={isCompleted}
        enter="transition ease-out duration-300"
        enterFrom='opacity-0 scale-[0.8]'
        enterTo='opacity-100 scale-100'
        leave="transition ease-in duration-100"
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-[0.8]'
        className='text-success'>
        {" "}
        <CheckCircle2 />{" "}
      </Transition>
    </span>
  )
}

export default ModalCollapseTitle
