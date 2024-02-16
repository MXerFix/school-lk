import React, { ReactNode } from "react"
import LabelInput from "../ui/LabelInput"
import classNames from "classnames"

type ModalCollapseType = {
  children?: ReactNode
  title?: ReactNode
  cols?: number
  rows?: number
  flow?: "row" | "column"
  defaultOpen?: boolean
  name?: string
  className?: string
}

const ModalCollapse = ({
  children,
  title = "Title",
  cols = 2,
  rows = 3,
  flow = "column",
  defaultOpen = true,
  name="modal-collapse",
  className
}: ModalCollapseType) => {
  return (
    <div className={classNames('collapse collapse-arrow bg-base-100 max-h-fit', className)}>
      <input
        type='radio'
        name={name}
        defaultChecked={defaultOpen}
      />
      <div className='collapse-title text-xl font-medium'>{title}</div>
      <div
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridAutoFlow: flow
        }}
        className={`collapse-content grid gap-y-2 gap-x-4`}>
        {children}
      </div>
    </div>
  )
}

export default ModalCollapse
