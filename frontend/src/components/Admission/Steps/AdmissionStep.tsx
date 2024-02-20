import React, { useEffect } from "react"
import AdmissionStep_1 from "./AdmissionStep_1"
import AdmissionStep_2 from "./AdmissionStep_2"
import AdmissionStep_3 from "./AdmissionStep_3"
import AdmissionStep_4 from "./AdmissionStep_4"
import AdmissionStep_5 from "./AdmissionStep_5"
import AdmissionHello from "./AdmissionHello"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useAdmissionStore } from "../../../store/store.admission"
import { Transition } from "@headlessui/react"

type AdmissionStepType = {
  step: number
}

const AdmissionStep = ({ step }: AdmissionStepType) => {
  const navigate = useNavigate({
    from: "/lk/admission",
  })

  const { setStepStatus, setActiveStep, steps } = useAdmissionStore()

  const nextStepHandler = () => {
    setStepStatus(step, "success")
    setActiveStep(step + 1)
    navigate({
      to: "/lk/admission",
      search: { step: step + 1 },
    })
  }

  return (
    <>
      {(step === 0 || !step) && <AdmissionHello />}
      {step === 1 && <AdmissionStep_1 />}
      {step === 2 && <AdmissionStep_2 />}
      {step === 3 && <AdmissionStep_3 />}
      {step === 4 && <AdmissionStep_4 />}
      {step === 5 && <AdmissionStep_5 />}
    </>
  )
}

export default AdmissionStep
