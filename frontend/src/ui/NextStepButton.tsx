import classNames from "classnames"
import React from "react"

export interface NextStepButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  nextStepHandler: () => void
  activeStep: number
  step_index: number
  pending: boolean
  className?:string
}

const NextStepButton = ({
  nextStepHandler,
  activeStep,
  step_index,
  pending,
  disabled,
  className,
  ...props
}: NextStepButtonType) => {
  return (
    <div className="flex w-full items-center justify-end sticky bottom-0 right-8">
      <button
      onClick={nextStepHandler}
      className={classNames('btn btn-success text-base-content  text-lg z-20 max-2xl:bottom-4 max-2xl:right-4', className)}
      disabled={activeStep > step_index || disabled}
      {...props}>
      {pending ? <span className='loading loading-spinner'></span> : "Перейти к следующему шагу"}
    </button>
    </div>
  )
}

export default NextStepButton
