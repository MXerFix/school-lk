import React, { useEffect, useMemo, useState } from "react"
import NextStepButton from "../../../ui/NextStepButton"
import { useAdmissionStore } from "../../../store/store.admission"
import { useAdmissionStepMutate } from "../../../hooks/admission/useAdmissionStepMutate"
import toast from "react-hot-toast"
import { useDocumentCreate } from "../../../hooks/documents/useDocumentCreate"
import { createFormData } from "../../../utils"
import { useDocumentGetReq } from "../../../hooks/documents/useDocumentGetReq"
import { useSearch } from "@tanstack/react-router"

const AdmissionStep_2 = () => {

  const { activeStep, steps } = useAdmissionStore()
  const { MutateAdmissionStepFn, isAdmissionMutatePending, data } = useAdmissionStepMutate()
  const { createDocumentFn, isCreateDocumentSuccess, isCreateDocumentPending } = useDocumentCreate()
  const { getReqDocumentFn, isGetReqDocumentSuccess, isGetReqDocumentPending } =
    useDocumentGetReq(2)

  const [file, setFile] = useState<File>()

  const is_status_pending = useMemo(() => steps[activeStep]?.status === "pending", [steps, activeStep, isAdmissionMutatePending])
  


  const nextStepHandler = () => {
    if (file) {
      const formData = createFormData(
        file,
        "Квитанция об оплате приемной кампании",
        "checkout",
        "true",
        "2",
        ["checkout"]
      )
      if (formData) {
        createDocumentFn(formData)
      }
    }
  }

  useEffect(() => {
    if (isCreateDocumentSuccess && !isCreateDocumentPending) {
      getReqDocumentFn()
    }
  }, [isCreateDocumentSuccess, isCreateDocumentPending])

  useEffect(() => {
    if (isGetReqDocumentSuccess && !isGetReqDocumentPending) {
      MutateAdmissionStepFn({
        status: "pending",
        step_index: activeStep,
      })
    }
  }, [isGetReqDocumentPending, isGetReqDocumentSuccess])

  return (
    <div>
      <div>
        <h2 className='text-3xl font-medium mb-8'>Оплата приемной кампании</h2>
        {is_status_pending ? (
          <div className='absolute top-0 left-0 w-full h-full flex flex-col px-8 justify-center items-center rounded-3xl backdrop-blur-sm '>
            <h3 className='mb-8 text-3xl'> Оплата принята в обработку! </h3>
            <p className='text-xl text-center mb-2'>
              {" "}
              Об изменении статуса оплаты и назначении даты первого собеседования Вы будете
              уведомлены по почте и во вкладке "Уведомления" в личном кабинете!
            </p>
            <p className='text-xl text-center'>
              {" "}
              После назначения даты собеседования статус данного этапа приемной кампании изменится
              автоматически!{" "}
            </p>
          </div>
        ) : (
          <>
            <p className='max-2xl:text-lg mb-8'>
              На этом этапе вам предстоит оплатить приемную кампанию. После оплаты прикрепите квитанцию
              об оплате или чек в соответствующее поле. Иначе переход к следующему шагу не будет
              доступен.
            </p>
            <div className='flex items-start justify-between w-full'>
              <label htmlFor=''>
                <p className='mb-4'> QR-Код для оплаты </p>
                <img
                  src='https://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=%D1%8D%D1%82%D0%BE+qr-code+%D0%BD%D0%B0+%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D1%83&amp;qzone=1&amp;margin=0&amp;size=256x256&amp;ecc=L'
                  alt='qr code'
                />
                <span className='text-sm mt-6 block'>
                  В комментарии к платежу укажите ФИО ребенка.
                </span>
                <span className='text-sm mt-1.5 block'>
                  {" "}
                  Если qr-код работает некорректно, перейдите по{" "}
                  <a
                    className='link link-primary'
                    href=''
                    target='_blank'>
                    ссылке
                  </a>
                  .{" "}
                </span>
                <span className='text-sm mt-1.5 block'>
                  {" "}
                  Скачать{" "}
                  <a
                    className='link link-primary'
                    href={`${import.meta.env.VITE_API_URL}/static/downloads/schet_oferta_priemnaya_kampania.docx`}
                    target='_blank'>
                    счет-оферту
                  </a>
                  .{" "}
                </span>
              </label>
              <div className='flec flex-col justify-between items-start'>
                <label
                  htmlFor=''
                  className='flex flex-col items-start'>
                  <p className='mb-4'>Квитанция об оплате</p>
                  <input
                    type='file'
                    accept='image/webp, image/jpeg, image/png, application/pdf'
                    className='file-input'
                    name=''
                    id=''
                    onChange={(e) => {
                      if (e.target.files) {
                        if (e.target?.files[0].size > 1048576) {
                          e.preventDefault()
                          e.target.value = ""
                          toast.error("Размер файла не должен превышать 1 МБ")
                        } else {
                          setFile(e.target.files[0])
                        }
                      }
                    }}
                  />
                  <span className='text-sm mt-0.5'>Размер файла не должен превышать 1 МБ</span>
                </label>
                <div>
                  <p></p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <NextStepButton
        className={is_status_pending ? 'blur-sm' : ''}
        nextStepHandler={nextStepHandler}
        disabled={!file || is_status_pending}
        pending={isCreateDocumentPending || isGetReqDocumentPending}
        activeStep={activeStep}
        step_index={2}
      />
    </div>
  )
}

export default AdmissionStep_2
