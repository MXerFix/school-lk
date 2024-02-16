import React, { useEffect, useMemo, useRef, useState } from "react"
import ContentBlock from "../ContentBlock"
import useDialog from "../../hooks/useDialog"
import { ParentPassportType, ParentType, useParentsStore } from "../../store/store.parents"
import { useClickAway } from "@uidotdev/usehooks"
import LabelInput from "../../ui/LabelInput"
import LabelRadio from "../../ui/LabelRadio"
import ModalCollapse from "../ModalCollapse"
import ModalCollapseTitle from "../../ui/ModalCollapseTitle"
import toast, { Toaster } from "react-hot-toast"
import { Info } from "lucide-react"
import { useParentCreate } from "../../hooks/parents/useParentCreate"
import { deepEqual } from "../../utils"

type ProfileParentBlockType = {
  parent?: ParentType
}

const ProfileParentBlock = ({ parent }: ProfileParentBlockType) => {
  const { parents, setParents, addParent } = useParentsStore()
  const modalRef = useRef<HTMLDialogElement>(null)
  const { openModal, closeModal } = useDialog(modalRef)

  const [citizenship, setCitizenship] = useState(parent?.citizenship ?? "")
  const [name, setName] = useState(parent?.name ?? "")
  const [surname, setSurname] = useState(parent?.surname ?? "")
  const [lastname, setLastname] = useState(parent?.lastname ?? "")
  const [birthDate, setBirthDate] = useState(parent?.birthDate ?? "")
  const [gender, setGender] = useState(parent?.gender ?? "")
  const [passport, setPassport] = useState<ParentPassportType>()
  const [passport_number, setPassportNumber] = useState("")
  const [passport_series, setPassportSeries] = useState("")
  const [passport_address, setPassportAddress] = useState("")
  const [passport_addressDate, setPassportAddressDate] = useState("")
  const [passport_date, setPassportDate] = useState("")
  const [passport_department, setPassportDepartment] = useState("")
  const [passport_issuedBy, setPassportIssuedBy] = useState("")
  const [insurance, setInsurance] = useState(parent?.insurance ?? "")
  const [email, setEmail] = useState(parent?.email ?? "")
  const [tel, setTel] = useState(parent?.tel ?? "")
  const [snils, setSnils] = useState(parent?.snils ?? "")

  const parent_initial = useMemo(
    () => ({
      name,
      surname,
      lastname,
      birthDate,
      gender,
      email,
      tel,
      snils,
      passport_number,
      passport_series,
      passport_address,
      passport_date,
      passport_department,
      passport_issuedBy,
      passport_addressDate,
    }),
    [parent, parent?.passport, passport]
  )

  const parent_state = useMemo(
    () => ({
      name,
      surname,
      lastname,
      birthDate,
      gender,
      email,
      tel,
      snils,
      passport_number,
      passport_series,
      passport_address,
      passport_date,
      passport_department,
      passport_issuedBy,
      passport_addressDate,
    }),
    [
      name,
      surname,
      lastname,
      birthDate,
      gender,
      email,
      tel,
      snils,
      passport_number,
      passport_series,
      passport_address,
      passport_date,
      passport_department,
      passport_issuedBy,
      passport_addressDate,
    ]
  )
  const isEqual = useMemo(
    () => deepEqual(parent_state, parent_initial),
    [parent_state, parent_initial]
  )

  useEffect(() => {
    setName(parent?.name ?? "")
    setSurname(parent?.surname ?? "")
    setLastname(parent?.lastname ?? "")
    setBirthDate(parent?.birthDate ?? "")
    setGender(parent?.gender ?? "")
    setCitizenship(parent?.citizenship ?? "")
    setInsurance(parent?.insurance ?? "")
    setEmail(parent?.email ?? "")
    setTel(parent?.tel ?? "")
    setSnils(parent?.snils ?? "")
    if (parent && parent.passport) {
      setPassport((prev) => JSON.parse(parent?.passport ?? ""))
    }
  }, [parent, parent?.passport])

  useEffect(() => {
    if (passport) {
      setPassportNumber(passport?.number ?? "")
      setPassportSeries(passport?.series ?? "")
      setPassportAddress(passport?.address ?? "")
      setPassportDate(passport?.issue_date ?? "")
      setPassportDepartment(passport?.department ?? "")
      setPassportIssuedBy(passport?.issued_by ?? "")
      setPassportAddressDate(passport?.address_date ?? "")
    }
  }, [passport])

  const resetToInitial = () => {
    setName(parent_initial.name)
    setSurname(parent_initial.surname)
    setLastname(parent_initial.lastname)
    setBirthDate(parent_initial.birthDate)
    setGender(parent_initial.gender)
    setPassportNumber(parent_initial.passport_number)
    setPassportSeries(parent_initial.passport_series)
    setPassportAddress(parent_initial.passport_address)
    setPassportAddressDate(parent_initial.passport_addressDate)
    setPassportDate(parent_initial.passport_date)
    setPassportDepartment(parent_initial.passport_department)
    setPassportIssuedBy(parent_initial.passport_issuedBy)
    setEmail(parent_initial.email)
    setTel(parent_initial.tel)
    setSnils(parent_initial.snils)
  }

  const { createParentFn, isSuccess, isPending } = useParentCreate(parent_state)

  const [firstBlock, setFirstBlock] = useState(false)
  const [secondBlock, setSecondBlock] = useState(false)
  const [thirdBlock, setThirdBlock] = useState(false)

  useEffect(() => {
    if (name.length > 0 && surname.length > 0 && birthDate && gender) {
      setFirstBlock(true)
    } else {
      setFirstBlock(false)
    }
    if (
      passport_number.length === 6 &&
      passport_series.length === 4 &&
      passport_date &&
      passport_department.length === 7 &&
      passport_issuedBy &&
      passport_addressDate
    ) {
      setSecondBlock(true)
    } else {
      setSecondBlock(false)
    }
    if (email.length > 5 && tel.length >= 12) {
      setThirdBlock(true)
    } else {
      setThirdBlock(false)
    }
  }, [
    birthDate,
    email,
    gender,
    insurance,
    name,
    passport_addressDate,
    passport_date,
    passport_department,
    passport_issuedBy,
    passport_number,
    passport_series,
    surname,
    tel,
  ])

  const saveData = async () => {
    if (!firstBlock || !secondBlock || !thirdBlock) {
      toast.error("Заполните все обязательные поля", {
        id: "check_fields",
      })
    } else {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("surname", surname)
      formData.append("lastname", lastname)
      formData.append("birthDate", birthDate)
      formData.append("gender", gender)
      formData.append("email", email)
      formData.append("tel", tel)
      formData.append("snils", snils)
      formData.append("passport_number", passport_number)
      formData.append("passport_series", passport_series)
      formData.append("passport_address", passport_address)
      formData.append("passport_addressDate", passport_addressDate)
      formData.append("passport_date", passport_date)
      formData.append("passport_department", passport_department)
      formData.append("passport_issuedBy", passport_issuedBy)
      toast.loading("Сохранение...", { id: "check_parent_data" })
      createParentFn()
    }
  }

  const relation_type = useMemo(() => {
    return {
      father: "Отец",
      mother: "Мать",
      grandfather: "Дедушка",
      grandmother: "Бабушка",
      trustee: "Представитель",
    }
  }, [])

  return (
    <ContentBlock
      className={`relative`}
      title={"СВЕДЕНИЯ О РОДИТЕЛЕ"}
      size='huge'>
      {parent ? (
        <div className='grid grid-cols-2'>
          <div className='text-2xl flex flex-col gap-2'>
            <p className='flex items-center person-item-info'>
              <span>
                {parent.surname} {parent.name} {parent.lastname}
              </span>
            </p>
            <p className='person-item-info'>
              <span> Дата рождения:</span>
              {parent.birthDate.split("-").reverse().join(".")}
            </p>
            <p className='person-item-info'>
              <span> Почта:</span>
              {parent.email}
            </p>
            <p className='person-item-info'>
              <span> Телефон:</span>
              {parent.tel}
            </p>
          </div>
          <div className='absolute top-8 right-8 bg-base-neutral w-32 h-32 rounded-full flex items-center justify-center'>
            <p>{relation_type[parent.relation_type]}</p>
          </div>
          <div className='flex items-center justify-end'>
            <button
              onClick={openModal}
              className='btn btn-primary person-item-button'>
              {" "}
              Подробнее{" "}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center bg-transparent rounded-3xl'>
            <button
              onClick={openModal}
              className='btn btn-primary'>
              {" "}
              Добавить родителя{" "}
            </button>
          </div>
        </>
      )}
      <dialog
        ref={modalRef}
        className='modal backdrop-blur-sm'>
        <Toaster
          position='bottom-right'
          toastOptions={{
            success: {
              style: {
                backgroundColor: "#00AA6E",
                color: "white",
              },
            },
            error: {
              style: {
                backgroundColor: "#FC3737",
                color: "white",
              },
            },
          }}
        />
        <div className='modal-box min-w-[960px]'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm rounded-xl btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <div>
            <h3 className='text-3xl font-bold mb-6'> Анкета родителя </h3>
          </div>
          <div>
            <div className='flex flex-col items-start justify-start gap-2.5 h-[60vh]'>
              <ModalCollapse
                defaultOpen
                flow='column'
                className='bg-base-200'
                name='parent-info'
                title={
                  <ModalCollapseTitle isCompleted={firstBlock}>
                    Основная информация
                  </ModalCollapseTitle>
                }>
                <LabelInput
                  // ref={nameRef}
                  required
                  label='Имя'
                  value={name}
                  setValue={setName}
                  type='text'
                  placeholder='Имя*'
                />
                <LabelInput
                  // ref={surnameRef}
                  required
                  label='Фамилия'
                  value={surname}
                  setValue={setSurname}
                  type='text'
                  placeholder='Фамилия*'
                />
                <LabelInput
                  required
                  // ref={lastnameRef}
                  label='Отчество'
                  value={lastname}
                  setValue={setLastname}
                  type='text'
                  placeholder='Отчество (при наличии)'
                />
                <LabelInput
                  // ref={birthDateRef}
                  required
                  label='Дата рождения'
                  value={birthDate}
                  setValue={setBirthDate}
                  type='date'
                  placeholder='Дата рождения'
                />
                <LabelRadio
                  // ref={genderRef}
                  label='Пол'
                  value={gender}
                  setValue={setGender}
                  values={["male", "female"]}
                  options={["Муж", "Жен"]}
                />
              </ModalCollapse>
              <ModalCollapse
                className='bg-base-200'
                name='parent-info'
                title={<ModalCollapseTitle isCompleted={secondBlock}>Паспорт</ModalCollapseTitle>}
                flow='row'
                rows={2}
                cols={2}
                defaultOpen={false}>
                <LabelInput
                  // ref={passportRef}
                  min={4}
                  max={4}
                  required
                  label='Серия'
                  value={passport_series}
                  setValue={setPassportSeries}
                  type='text'
                  placeholder='0000'
                />
                <LabelInput
                  // ref={passportRef}
                  min={6}
                  max={6}
                  required
                  label='Номер'
                  value={passport_number}
                  setValue={setPassportNumber}
                  type='text'
                  placeholder='000000'
                />
                <LabelInput
                  // ref={passportRef}
                  required
                  label='Дата выдачи'
                  value={passport_date}
                  setValue={setPassportDate}
                  type='date'
                />
                <LabelInput
                  // ref={passportRef}
                  min={7}
                  max={7}
                  required
                  label='Код подразделения'
                  value={passport_department}
                  setValue={setPassportDepartment}
                  type='text'
                  placeholder='000-000'
                />
                <LabelInput
                  // ref={passportRef}
                  required
                  label='Кем выдан'
                  value={passport_issuedBy}
                  setValue={setPassportIssuedBy}
                  type='text'
                  placeholder='УМВД РФ ПО Г. МОСКВЕ'
                />
                <LabelInput
                  // ref={passportRef}
                  min={6}
                  required
                  label='Адрес регистрации'
                  value={passport_address}
                  setValue={setPassportAddress}
                  type='text'
                  placeholder='г.Москва, ул.Московская, д.2, кв.1'
                />
                <LabelInput
                  // ref={insuranceRef}
                  min={14}
                  max={14}
                  required
                  label='СНИЛС'
                  value={snils}
                  setValue={setSnils}
                  type='text'
                  placeholder='000 000 000 00'
                />
                <LabelInput
                  // ref={passportRef}
                  required
                  label='Дата регистрации'
                  value={passport_addressDate}
                  setValue={setPassportAddressDate}
                  type='date'
                />
              </ModalCollapse>
              <ModalCollapse
                className='bg-base-200'
                name='parent-info'
                cols={1}
                rows={2}
                flow='row'
                defaultOpen={false}
                title={
                  <ModalCollapseTitle isCompleted={thirdBlock}>
                    <span className='flex items-center justify-start gap-2'>
                      {"Контактная информация"}{" "}
                    </span>
                  </ModalCollapseTitle>
                }>
                <LabelInput
                  // ref={emailRef}
                  required
                  min={7}
                  label='Почта'
                  value={email}
                  setValue={setEmail}
                  type='email'
                  placeholder='email@example.com'
                />
                <LabelInput
                  required
                  min={12}
                  max={12}
                  // ref={telRef}
                  label='Телефон'
                  value={tel}
                  setValue={setTel}
                  type='text'
                  placeholder='+7 (___) _______'
                />
              </ModalCollapse>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <button
                  onClick={resetToInitial}
                  className='btn btn-ghost text-base-content'>
                  Сбросить
                </button>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={closeModal}
                  className='btn btn-accent text-base-content'>
                  Закрыть
                </button>
                <button
                  disabled={isEqual}
                  onClick={saveData}
                  className='btn btn-success text-base-content'>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
        <form
          method='dialog'
          className='modal-backdrop cursor-auto'>
          <button>close</button>
        </form>
      </dialog>
    </ContentBlock>
  )
}

export default ProfileParentBlock
