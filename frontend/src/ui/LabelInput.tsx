import classNames from "classnames"
import React, { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, RefObject } from "react"
import InputMask, { ReactInputMask } from "react-input-mask"

interface LeftLabelInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  side?: "left" | "right"
  label?: ReactNode
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  setValue?: (value: string) => void
  min?: number
  max?: number
  ref?: RefObject<HTMLInputElement>
  className?: string
  inputClassName?: string
  accept?: string
}

const LabelInput = ({
  label = "Label",
  placeholder = "Placeholder",
  setValue,
  type = "text",
  value,
  side = "left",
  required = false,
  min,
  max,
  ref,
  className,
  inputClassName,
  accept
}: LeftLabelInputType) => {
  return (
    <div
      className={classNames(
        `flex items-center justify-start ${side === "left" ? "flex-row" : "flex-row-reverse"} w-full `,
        className
      )}>
      <label className='label w-[40%]'>
        <span className='label-text flex items-center justify-start w-full h-10 rounded-lg'>
          {label}
        </span>
      </label>
      <input
        ref={ref}
        required={required}
        type={type}
        placeholder={placeholder}
        accept={accept}
        className={classNames('input bg-base-100 focus-within:outline-none required:valid:border-success h-10 w-[60%]', inputClassName)}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        minLength={min}
        maxLength={max}
      />
    </div>
  )
}

export default LabelInput
