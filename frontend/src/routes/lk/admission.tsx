import { Outlet, createFileRoute, useNavigate, useParams, useSearch } from "@tanstack/react-router"
import AdmissionRightBar from "../../components/Admission/AdmissionRightBar"
import AdmissionStep from "../../components/Admission/Steps/AdmissionStep"
import { useEffect } from "react"
import { useAdmissionStore } from "../../store/store.admission"

const Admission = () => {
  const { step }: { step: number } = useSearch({
    from: "/lk/admission",
  })

  const navigate = useNavigate()
  const { activeStep } = useAdmissionStore()

  useEffect(() => {
      if (activeStep > -1 && step > activeStep) {
        console.log(step, activeStep)
        navigate({
          to: "/lk/admission",
          search: { step: activeStep },
        })
      } 
      if (activeStep === -1) {
        navigate({
          to: "/lk/home",
        })
      }
  }, [activeStep, navigate, step])

  return (
    <div className='grid grid-cols-5 col-span-3 gap-12 w-full'>
      <div className='bg-primary-content content-block-shadow col-span-4 admission-window relative'>
        <AdmissionStep step={step} />
      </div>
      <AdmissionRightBar />
    </div>
  )
}

export const Route = createFileRoute("/lk/admission")({
  component: Admission,
})
