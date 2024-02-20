import React, { ReactNode } from "react"
import { admission_steps } from "../../consts"
import { Link, useSearch } from "@tanstack/react-router"
import { AdmissionStepStatusType, useAdmissionStore } from "../../store/store.admission"
import { CheckCheck, CircleSlash, Timer, XCircle } from "lucide-react"
import StepStatus from "./StepStatus"
import classNames from "classnames"

const AdmissionRightBar = () => {
  const { steps } = useAdmissionStore()
  const search: { step: number } = useSearch({
    from: "/lk/admission",
  })

  return (
    <div
      id='adadad'
      className='bg-primary-content content-block-shadow col-span-1 admission-right-bar carousel carousel-vertical'>
      {steps.map((step) => (
        <div key={step.id} className="w-full">
          <Link
            disabled={step.status === 'closed'}
            className='flex flex-col items-center justify-center gap-2 carousel-item scroll-my-8 max-2xl:scroll-my-[26px]'
            to={"/lk/admission"}
            key={step.id}
            search={{ step: step.id }}>
            <StepStatus status={step.status ?? "closed"} />
            <p className={classNames('px-2 rounded-lg transition', step.status === 'closed' && 'text-base-neutral', step.id === search.step && 'bg-base-neutral')}>{step.title}</p>
          </Link>
          <div className='divider w-full max-2xl:my-2 snap-y'></div>
        </div>
      ))}
    </div>
  )
}

export default AdmissionRightBar
