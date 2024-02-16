import React, { ReactNode } from "react"

type LabelSelectType = {
  side?: "left" | "right"
  label?: ReactNode
  placeholder?: string
  value?: string
  setValue?: (value: string) => void
}
const LabelSelect = ({ label = "Label", placeholder = "Placeholder" }: LabelSelectType) => {
  return (
    <div className="flex items-center">
      <label className='label'>
        <span className='label-text flex items-center justify-start w-[120px] h-10 rounded-lg'>
          {label}
        </span>
      </label>
      <div className='dropdown dropdown-bottom dropdown-content flex items-center'>
        <div
          tabIndex={0}
          role='button'
          className='btn btn-sm h-10 w-[204px] justify-start text-[#9CA3AF] font-normal text-[16px] px-4'>
          {placeholder}
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52'>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LabelSelect
