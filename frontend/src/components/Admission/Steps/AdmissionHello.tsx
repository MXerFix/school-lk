import React from "react"
import { useAdmissionStore } from "../../../store/store.admission"
import { useNavigate } from "@tanstack/react-router"
import { useAdmissionStepMutate } from "../../../hooks/admission/useAdmissionStepMutate"
import NextStepButton from "../../../ui/NextStepButton"

const AdmissionHello = () => {
  const { setStepStatus, setActiveStep, activeStep } = useAdmissionStore()
  const navigate = useNavigate({
    from: "/lk/admission",
  })

  const { MutateAdmissionStepFn, isAdmissionMutatePending } = useAdmissionStepMutate()

  const nextStepHandler = () => {
    MutateAdmissionStepFn({
      status: "success",
      step_index: activeStep,
    })
  }

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className="">
        <h2 className='text-3xl max-2xl:text-xl mb-2 font-medium'>
          Добро пожаловать на приемную кампанию!
        </h2>
        <div className='text-lg max-2xl:text-[16px]'>
          <h5>
            Дорогие родители и будущие первоклассники! Мы рады приветствовать вас на приемной
            кампании в нашу начальную школу! На этом этапе мы ознакомим вас с основными шагами
            приемной кампании.
          </h5>
          <br />
          <ul className='list-decimal ml-5'>
            <li className='my-1'>
              <span className='font-semibold'>Первичные документы:</span> Пожалуйста, предоставьте
              все необходимые первичные документы, такие как свидетельство о рождении ребенка и
              документы родителей.
            </li>
            <li className='my-1'>
              <span className='font-semibold'>Оплата приемной кампании:</span> Убедитесь, что вы
              произвели оплату приемной кампании в соответствии с установленными сроками.
            </li>
            <li className='my-1'>
              <span className='font-semibold'>Собеседования с экзаменами:</span> Мы проведем
              собеседования и экзамены, чтобы убедиться, что каждый ребенок готов к обучению в нашей
              школе.
            </li>
            <li className='my-1'>
              <span className='font-semibold'>Документы для поступления:</span> После успешного
              прохождения всех этапов, вам потребуется предоставить дополнительные документы для
              окончательного поступления.
            </li>
            <li className='my-1'>
              <span className='font-semibold'>Оплата обучения и финал:</span> После подтверждения
              поступления, вам необходимо будет произвести оплату обучения и подписать окончательные
              документы.
            </li>
          </ul>
          <p className='my-4 font-semibold text-xl'>Желаем удачи!</p>
        </div>
      </div>
      <NextStepButton
        nextStepHandler={nextStepHandler}
        step_index={0}
        pending={isAdmissionMutatePending}
        activeStep={activeStep}
      />
    </div>
  )
}

export default AdmissionHello
