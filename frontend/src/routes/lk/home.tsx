import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router"
import { useThemeStore } from "../../store/store.theme"
import { Bell, LogOut, Mail, Palette, ScrollText, Search, TestTube2 } from "lucide-react"
import ThemeToggler from "../../ui/ThemeToggler"
import ContentBlock from "../../components/ContentBlock"
import { useUserStore } from "../../store/store.user"
import { useAdmissionStore } from "../../store/store.admission"
import StepStatus from "../../components/Admission/StepStatus"
import { useChildStore } from "../../store/store.child"
import toast from "react-hot-toast"
import { useChildGet } from "../../hooks/child/useChildGet"
import { useAdmissionGet } from "../../hooks/admission/useAdmissionGet"
import { useParentsGet } from "../../hooks/parents/useParentsGet"
import { useEffect } from "react"
import { useParentsStore } from "../../store/store.parents"

const Home = () => {
  const { user } = useUserStore()
  const { steps, activeStep } = useAdmissionStore()
  const { child } = useChildStore()
  const { parents } = useParentsStore()
  console.log(user)
  const navigate = useNavigate()

  const { activated }: { activated: boolean } = useSearch({
    from: '/lk/home'
  })

  useEffect(() => {
    if (activated) {
      toast.success('Ваш аккаунт успешно активирован!')
      navigate({
        to: "/lk/home",
      })
    }
  }, [activated, navigate])

  


  const startAdmissionHandler = () => {
    if (!child && !parents.length) {
      navigate({
        to: "/lk/profile",
      })
      return toast.error("Пожалуйста, заполните анкету ребенка и родителя")
    }
    if (!child ) {
      navigate({
        to: "/lk/profile",
      })
      return toast.error("Пожалуйста, заполните профиль ребенка")
    }
    if (!parents.length) {
      navigate({
        to: "/lk/profile",
      })
      return toast.error("Пожалуйста, заполните анкету родителя")
    }
    if (child && parents.length) {
      navigate({
        to: "/lk/admission",
        search: { step: 0 },
      })
    }
  }

  return (
    <>
      {/* <div className='p-12 grid grid-cols-4 row-span-full gap-12'>
        <div></div>
        <div className="col-span-3 h-12"></div>
        <div></div> */}
      <div className='text-base-content col-span-3 grid grid-cols-4 gap-12 pr-12'>
        <ContentBlock
          className='relative'
          size='huge'
          title='ШАГИ ПРИЕМНОЙ КАМПАНИИ'>
          <div className='flex items-center justify-around mt-10'>
            {activeStep > -1 ? (
              <>
                {steps.map((step) => {
                  return (
                    <Link
                      to={"/lk/admission"}
                      search={{ step: step.id }}
                      disabled={step.status === "closed"}
                      key={step.id}
                      className='flex flex-col items-center justify-center gap-4 w-1/6'>
                      <StepStatus status={step.status ?? "closed"} />
                      {step.title}
                    </Link>
                  )
                })}
              </>
            ) : (
              <>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div>
                  <div className='skeleton w-24 h-24 rounded-full mb-2'></div>
                  <div className='skeleton w-24 h-2 rounded-full mb-1'></div>
                  <div className='skeleton w-24 h-2 rounded-full'></div>
                </div>
                <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  <button onClick={startAdmissionHandler} className="btn btn-primary text-white">
                    Начать приемную кампанию
                  </button>
                </div>
              </>
            )}
          </div>
          {/* <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center'>
            <button className='btn btn-success'>Начать приемную кампанию</button>
          </div> */}
        </ContentBlock>
        <ContentBlock
          icon={<TestTube2 className='text-primary' />}
          title='Я-ИССЛЕДОВАТЕЛЬ'>
          <div className='flex flex-col items-start justify-end h-full pb-4'>
            <div className='skeleton w-full h-1/6 mb-3'></div>
            <div className='skeleton w-full h-4/6'></div>
          </div>
        </ContentBlock>
        <ContentBlock
          icon={<Palette className='text-primary' />}
          title='КРУЖКИ'>
          <div className='flex flex-col items-between justify-end pb-4 h-full'>
            <div className='flex flex-row items-center justify-between mb-2'>
              <div className='skeleton rounded-full w-32 h-32 mb-3'></div>
              <div className='skeleton rounded-full w-32 h-32 mb-3'></div>
              <div className='skeleton rounded-full w-32 h-32 mb-3'></div>
            </div>
            <div className='skeleton w-full h-1/6'></div>
          </div>
        </ContentBlock>
      </div>
      {/* </div> */}
    </>
  )
}

export const Route = createFileRoute("/lk/home")({
  component: Home,
})
