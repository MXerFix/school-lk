import React, { useEffect, useState } from "react"
import { useAdmissionStore } from "../../../store/store.admission"
import { useNavigate } from "@tanstack/react-router"
import { useAdmissionStepMutate } from "../../../hooks/admission/useAdmissionStepMutate"
import NextStepButton from "../../../ui/NextStepButton"
import FileInputClip from "../../../ui/FileInputClip"
import { useDocumentCreate } from "../../../hooks/documents/useDocumentCreate"
import { useDocumentGetReq } from "../../../hooks/documents/useDocumentGetReq"
import { createFormData } from "../../../utils"

const AdmissionStep_1 = () => {
  const { activeStep } = useAdmissionStore()

  const [loading, setLoading] = useState(false)

  const [isRequiredDocumentsUploaded, setIsRequiredDocumentsUploaded] = useState(false)
  const [childBirthCertificate, setChildBirthCertificate] = useState<File>()
  const [childSnils, setChildSnils] = useState<File>()
  const [parentPassport, setParentPassport] = useState<File>()
  const [parentSnils, setParentSnils] = useState<File>()
  const [parentSurnameChangeCertificate, setParentSurnameChangeCertificate] = useState<File>()
  const [largeFamilyCertificate, setLargeFamilyCertificate] = useState<File>()
  const [disabilityCertificate, setDisabilityCertificate] = useState<File>()
  const [svoCertificate, setSvoCertificate] = useState<File>()
  const [personalDataAgreement, setPersonalDataAgreement] = useState<File>()
  const [diagnosticAgreement, setDiagnosticAgreement] = useState<File>()
  const [psychoAgreement, setPsychoAgreement] = useState<File>()

  useEffect(() => {
    if (
      childBirthCertificate &&
      childSnils &&
      parentPassport &&
      parentSnils &&
      personalDataAgreement &&
      diagnosticAgreement &&
      psychoAgreement
    ) {
      setIsRequiredDocumentsUploaded(true)
    } else {
      setIsRequiredDocumentsUploaded(false)
    }
  }, [
    childBirthCertificate,
    childSnils,
    diagnosticAgreement,
    parentPassport,
    parentSnils,
    personalDataAgreement,
    psychoAgreement,
  ])

  const { createDocumentFn, isCreateDocumentPending } = useDocumentCreate()
  const { getReqDocumentFn, isGetReqDocumentPending, isGetReqDocumentSuccess, data } =
    useDocumentGetReq(1)
  const { MutateAdmissionStepFn, isAdmissionMutatePending } = useAdmissionStepMutate()

  const createDocuments = async () => {
    const childBirthCertificateData = createFormData(
      childBirthCertificate!,
      "Свидетельство о рождении ребенка",
      "child_passport",
      "true",
      "1",
      ["child_passport", "child", "passport"]
    )
    const childSnilsData = createFormData(
      childSnils!,
      "СНИЛС ребенка",
      "child_snils",
      "true",
      "1",
      ["child_snils", "child", "snils"]
    )
    const parentPassportData = createFormData(
      parentPassport!,
      "Паспорт родителя",
      "parent_passport",
      "true",
      "1",
      ["parent_passport", "parent", "passport"]
    )
    const parentSnilsData = createFormData(
      parentSnils!,
      "СНИЛС родителя",
      "parent_snils",
      "true",
      "1",
      ["parent_snils", "parent", "snils"]
    )
    const parentSurnameChangeCertificateData = createFormData(
      parentSurnameChangeCertificate!,
      "Справка о смене фамилии родителя",
      "parent_surname_change",
      "false",
      "1",
      ["parent_surname_change", "parent", "additions"]
    )
    const largeFamilyCertificateData = createFormData(
      largeFamilyCertificate!,
      "Справка о статусе многодетной семьи",
      "large_family_document",
      "false",
      "1",
      ["large_family_document", "additions"]
    )
    const disabilityCertificateData = createFormData(
      disabilityCertificate!,
      "Справка о статусе инвалидности",
      "child_disability_document",
      "false",
      "1",
      ["child_disability_document", "child", "additions"]
    )
    const svoCertificateData = createFormData(
      svoCertificate!,
      "Справка об участии в СВО",
      "svo_document",
      "false",
      "1",
      ["svo_document", "parent", "additions"]
    )
    const personalDataAgreementData = createFormData(
      personalDataAgreement!,
      "Согласие на обработку персональных данных",
      "consent_personal_data",
      "true",
      "1",
      ["consent_personal_data", "consent"]
    )
    const diagnosticAgreementData = createFormData(
      diagnosticAgreement!,
      "Согласие на диагностическое тестирование",
      "consent_exams",
      "true",
      "1",
      ["consent_exams", "consent"]
    )
    const psychoAgreementData = createFormData(
      psychoAgreement!,
      "Согласие на психолого-логопедическую диагностику",
      "consent_psych_diagnosis",
      "true",
      "1",
      ["consent_psych_diagnosis", "consent"]
    )
    const formDatas = [
      childBirthCertificateData,
      childSnilsData,
      parentPassportData,
      parentSnilsData,
      parentSurnameChangeCertificateData,
      largeFamilyCertificateData,
      disabilityCertificateData,
      svoCertificateData,
      personalDataAgreementData,
      diagnosticAgreementData,
      psychoAgreementData,
    ]
    console.log(formDatas)
    try {
      formDatas.forEach(async (formData) => {
        if (formData) {
          createDocumentFn(formData)
        }
      })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const nextStepHandler = async () => {
    setLoading(prev => true)
    const res = await createDocuments()
    if (res) {
      setTimeout(() => {
        getReqDocumentFn()
      }, 500);
    }
  }

  useEffect(() => {
    if (data?.data.docs && isGetReqDocumentSuccess && !isGetReqDocumentPending) {
      MutateAdmissionStepFn({ status: "success", step_index: 1 })
      setLoading(prev => false)
    }
  }, [MutateAdmissionStepFn, data?.data.docs, isGetReqDocumentPending, isGetReqDocumentSuccess])

  return (
    <div>
      <h2 className='text-3xl font-medium mb-8 max-2xl:mb-4'>Документы</h2>
      <div>
        <p className='max-2xl:text-lg'>
          На этом этапе Вам необходимо прикрепить документы, перечисленные ниже. Некоторые из них
          нужно скачать, подписать, и прикрепить.
        </p>
        <div className='mt-8 max-2xl:mt-4 flex flex-col items-start justify-start gap-4'>
          <div className='collapse collapse-plus bg-base-neutral'>
            <input
              disabled={activeStep !== 1}
              type='radio'
              name='admission-documents-1-accordion'
              id=''
            />
            <div className='collapse-title font-medium max-2xl:text-xl'>Документы ребенка</div>
            <div className='collapse-content max-2xl:text-lg flex flex-col gap-2'>
              <FileInputClip
                disabled={activeStep !== 1}
                label='Свидетельство о рождении ребенка'
                setFile={setChildBirthCertificate}
                file={childBirthCertificate}
              />
              <FileInputClip
                disabled={activeStep !== 1}
                label='СНИЛС ребенка'
                setFile={setChildSnils}
                file={childSnils}
              />
            </div>
          </div>
          <div className='collapse collapse-plus bg-base-neutral'>
            <input
              disabled={activeStep !== 1}
              type='radio'
              name='admission-documents-1-accordion'
              id=''
            />
            <div className='collapse-title font-medium max-2xl:text-xl'>Документы родителя</div>
            <div className='collapse-content max-2xl:text-lg flex flex-col gap-2'>
              <FileInputClip
                disabled={activeStep !== 1}
                label='Паспорт родителя (с пропиской*)'
                setFile={setParentPassport}
                file={parentPassport}
              />
              <FileInputClip
                disabled={activeStep !== 1}
                label='СНИЛС родителя'
                setFile={setParentSnils}
                file={parentSnils}
              />
              <FileInputClip
                disabled={activeStep !== 1}
                label='Справка о смене фамилии (при наличии)'
                setFile={setParentSurnameChangeCertificate}
                file={parentSurnameChangeCertificate}
              />
            </div>
          </div>
          <div className='collapse collapse-plus bg-base-neutral'>
            <input
              disabled={activeStep !== 1}
              type='radio'
              name='admission-documents-1-accordion'
              id=''
            />
            <div className='collapse-title font-medium max-2xl:text-xl'>
              Дополнительные документы
            </div>
            <div className='collapse-content max-2xl:text-lg flex flex-col gap-2'>
              <FileInputClip
                disabled={activeStep !== 1}
                label='Справка о статусе многодетной семьи'
                setFile={setLargeFamilyCertificate}
                file={largeFamilyCertificate}
              />
              <FileInputClip
                disabled={activeStep !== 1}
                label='Справка об инвалидности/ОВЗ ребенка'
                setFile={setDisabilityCertificate}
                file={disabilityCertificate}
              />
              <FileInputClip
                disabled={activeStep !== 1}
                label='Справка участника СВО'
                setFile={setSvoCertificate}
                file={svoCertificate}
              />
            </div>
          </div>
          <div className='collapse collapse-plus bg-base-neutral'>
            <input
              disabled={activeStep !== 1}
              type='radio'
              name='admission-documents-1-accordion'
              id=''
            />
            <div className='collapse-title font-medium max-2xl:text-xl'>Согласия</div>
            <div className='collapse-content max-2xl:text-lg flex flex-col gap-2'>
              <FileInputClip
                disabled={activeStep !== 1}
                downloadLink={`${import.meta.env.VITE_API_URL}/static/downloads/soglasie_na_opd.docx`}
                file={personalDataAgreement}
                setFile={setPersonalDataAgreement}
                label='Согласие на обработку персональных данных'
              />
              <FileInputClip
                disabled={activeStep !== 1}
                downloadLink={`${import.meta.env.VITE_API_URL}/static/downloads/soglasie_na_diagnostic_test.docx`}
                file={diagnosticAgreement}
                setFile={setDiagnosticAgreement}
                label='Согласие на диагностическое тестирование'
              />
              <FileInputClip
                disabled={activeStep !== 1}
                downloadLink={`${import.meta.env.VITE_API_URL}/static/downloads/soglasie_na_logoped.docx`}
                file={psychoAgreement}
                setFile={setPsychoAgreement}
                label='Согласие на психолого-логопедическую диагностику'
              />
            </div>
          </div>
        </div>
      </div>
      <NextStepButton
        nextStepHandler={nextStepHandler}
        step_index={1}
        pending={isAdmissionMutatePending || loading}
        activeStep={activeStep}
        disabled={!isRequiredDocumentsUploaded || activeStep !== 1}
      />
    </div>
  )
}

export default AdmissionStep_1
