import React, { ReactNode } from "react"
import { AdmissionStepStatusType } from "../../store/store.admission"
import { CheckCheck, CircleSlash, Timer, XCircle } from "lucide-react"
import classNames from "classnames"

const StepStatus = ({ status }: { status: AdmissionStepStatusType }) => {
  const stepStatusIcon = (status: AdmissionStepStatusType): ReactNode => {
    switch (status) {
      case "success":
        return <CheckCheck className='w-8 h-8 text-success' />
      case "failed":
        return <XCircle className='w-8 h-8 text-error' />
      case "pending":
        return <Timer className='w-8 h-8 text-warning' />
      case "initial":
        return <CircleSlash className='w-8 h-8' />
      case "closed":
        return <Timer className='w-8 h-8 text-base-neutral' />
    }
  }

  return (
    <span
      className={classNames(
        "w-24 h-24 rounded-full border-2 border-base-content flex items-center justify-center max-2xl:w-20 max-2xl:h-20",
        status === "closed" && "border-base-neutral",
        status === "success" && "border-success",
        status === 'failed' && 'border-error',
        status === 'pending' && 'border-warning',
      )}>
      {stepStatusIcon(status)}
    </span>
  )
}

export default StepStatus
