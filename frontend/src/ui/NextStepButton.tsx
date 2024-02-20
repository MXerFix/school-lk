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
    <button
      onClick={nextStepHandler}
      className={classNames('btn btn-success text-base-content absolute bottom-8 right-8 text-lg', className)}
      disabled={activeStep > step_index || disabled}
      {...props}>
      {pending ? <span className='loading loading-spinner'></span> : "Перейти к следующему шагу"}
    </button>
  )
}

export default NextStepButton
