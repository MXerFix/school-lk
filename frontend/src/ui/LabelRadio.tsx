import React, { ReactNode, RefObject, useId } from "react"

type LabelRadioType = {
  side?: "left" | "right"
  label?: ReactNode
  options?: string[]
  values?: string[]
  value?: string
  setValue?: (value: string) => void
  ref?: RefObject<HTMLDivElement>
}


const LabelRadio = ({
  value = "Left",
  options = ["Left", "Right"],
  values = ["Left", "Right"],
  setValue,
  side = "left",
  label = "Label",
  ref,
}: LabelRadioType) => {

  
  
  const id = Math.random().toString(36).slice(2)

  return (
    <div
      ref={ref}
      className={`flex items-center justify-start ${side === "left" ? "flex-row" : "flex-row-reverse"} `}>
      <label className='label'>
        <span className='label-text flex items-center justify-start w-[120px] h-10 rounded-lg'>
          {label}
        </span>
      </label>
      <div className='flex items-center gap-2'>
        <div className='form-control'>
          <label className='label cursor-pointer flex items-center gap-1.5'>
            <span className='label-text'> {options[0]} </span>
            <input
              checked={value === values[0]}
              type='radio'
              name={id}
              className='radio checked:bg-success'
              onClick={() => setValue && setValue(values[0])}
            />
          </label>
        </div>
        <div className='form-control'>
          <label className='label cursor-pointer flex items-center gap-1.5'>
            <span className='label-text'> {options[1]} </span>
            <input
              checked={value === values[1]}
              type='radio'
              name={id}
              className='radio checked:bg-success'
              onClick={() => setValue && setValue(values[1])}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default LabelRadio
