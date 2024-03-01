import React, { useEffect, useMemo, useRef, useState } from "react"
import ContentBlock from "../ContentBlock"
import { useChildStore } from "../../store/store.child"
import useDialog from "../../hooks/useDialog"
import { useClickAway } from "@uidotdev/usehooks"
import LabelInput from "../../ui/LabelInput"
import LabelSelect from "../../ui/LabelSelect"
import LabelRadio from "../../ui/LabelRadio"
import ModalCollapse from "../ModalCollapse"
import { Info } from "lucide-react"
import ModalCollapseTitle from "../../ui/ModalCollapseTitle"
import toast, { Toaster } from "react-hot-toast"
import { useChildCreate } from "../../hooks/child/useChildCreate"
import { getAge, validateAge, validateRussianPhoneNumber } from "../../utils"
import { deepEqual } from "@tanstack/react-router"
import { useChildMutate } from "../../hooks/child/useChildMutate"

const ProfileChildBlock = () => {
  const { child } = useChildStore()
  const modalRef = useRef<HTMLDialogElement>(null)
  const { openModal, closeModal } = useDialog(modalRef)

  const [name, setName] = useState(child?.name ?? "")
  const [surname, setSurname] = useState(child?.surname ?? "")
  const [lastname, setLastname] = useState(child?.lastname ?? "")
  const [birthDate, setBirthDate] = useState(child?.birthDate ?? "")
  const [gender, setGender] = useState(child?.gender ?? "")
  const [citizenship, setCitizenship] = useState(child?.citizenship ?? "")
  const [passport, setPassport] = useState(child?.passport ?? "")
  const [insurance, setInsurance] = useState(child?.insurance ?? "")
  const [email, setEmail] = useState(child?.email ?? "")
  const [tel, setTel] = useState(child?.tel ?? "")
  const [img, setImg] = useState<File | null>()

  const initialChildState = useMemo(
    () => ({
      name: child?.name ?? "",
      surname: child?.surname ?? "",
      lastname: child?.lastname ?? "",
      birthDate: child?.birthDate ?? "",
      gender: child?.gender ?? "",
      citizenship: child?.citizenship ?? "",
      passport: child?.passport ?? "",
      insurance: child?.insurance ?? "",
      email: child?.email ?? "",
      tel: child?.tel ?? "",
      img: null,
    }),
    [child]
  )

  const child_state = useMemo(
    () => ({
      name,
      surname,
      lastname,
      birthDate,
      gender,
      citizenship,
      passport,
      insurance,
      email,
      tel,
      img,
    }),
    [name, surname, lastname, birthDate, gender, citizenship, passport, insurance, email, tel, img]
  )

  const isEqual = useMemo(
    () => deepEqual(initialChildState, child_state),
    [initialChildState, child_state]
  )

  useEffect(() => {
    setName(child?.name ?? "")
    setSurname(child?.surname ?? "")
    setLastname(child?.lastname ?? "")
    setBirthDate(child?.birthDate ?? "")
    setGender(child?.gender ?? "")
    setCitizenship(child?.citizenship ?? "")
    setPassport(child?.passport ?? "")
    setInsurance(child?.insurance ?? "")
    setEmail(child?.email ?? "")
    setTel(child?.tel ?? "")
    setImg(null)
  }, [child])

  const resetStateToInitial = () => {
    setName(initialChildState.name)
    setSurname(initialChildState.surname)
    setLastname(initialChildState.lastname)
    setBirthDate(initialChildState.birthDate)
    setGender(initialChildState.gender)
    setCitizenship(initialChildState.citizenship)
    setPassport(initialChildState.passport)
    setInsurance(initialChildState.insurance)
    setEmail(initialChildState.email)
    setTel(initialChildState.tel)
    setImg(initialChildState.img)
  }

  // const nameRef = useRef(null)
  // const surnameRef = useRef(null)
  // const lastnameRef = useRef(null)
  // const birthDateRef = useRef(null)
  // const genderRef = useRef(null)
  // const citizenshipRef = useRef(null)
  // const passportRef = useRef(null)
  // const insuranceRef = useRef(null)
  // const emailRef = useRef(null)
  // const telRef = useRef(null)

  const [firstBlock, setFirstBlock] = useState(false)
  const [secondBlock, setSecondBlock] = useState(false)
  const [thirdBlock, setThirdBlock] = useState(false)

  const { createChildFn } = useChildCreate()
  const { mutateChildFn } = useChildMutate()

  const saveData = async () => {
    if (!validateRussianPhoneNumber(tel) && tel) {
      toast.error('Некорректный номер телефона', { id: 'check_phone' })
    }
    if (!firstBlock || !img) {
      toast.error("Заполните все обязательные поля", {
        id: "check_fields",
      })
    } else {
      toast.loading("Сохранение...", { id: "check_child_data" })
      const formData = new FormData()
      formData.append("name", name)
      formData.append("surname", surname)
      formData.append("lastname", lastname)
      formData.append("birthDate", birthDate)
      formData.append("gender", gender)
      formData.append("passport", passport)
      formData.append("insurance", insurance)
      formData.append("email", email)
      formData.append("tel", tel)
      formData.append("img", img)
      console.log(formData.get("name"))
      if (child) {
        mutateChildFn(formData)
        console.log("mutate")
      } else {
        console.log("create")
        createChildFn(formData)
      }
    }
  }

  // useEffect(() => {
  //   if (!validateAge(birthDate, 5, 7) && birthDate) {
  //     toast.error('Некорректная дата рождения', {
  //       id: 'child_age_lower_warn'
  //     })
  //     setFirstBlock(false)
  //   }
  // }, [birthDate])

  useEffect(() => {
    if (name.length > 0 && surname.length > 0 && birthDate && validateAge(birthDate, 5, 7) && gender && (img || child?.img)) {
        setFirstBlock(true)
    } else {
      setFirstBlock(false)
    }
    // if (passport.length === 13 && insurance.length === 14) {
    //   setSecondBlock(true)
    // } else {
    //   setSecondBlock(false)
    // }
    if (email.length > 5 && tel.length >= 12) {
      setThirdBlock(true)
    } else {
      setThirdBlock(false)
    }
  }, [birthDate, child?.img, email, gender, img, insurance, name, passport, surname, tel])

  // useEffect(() => {
  //   if (passport.length === 2) {
  //     setPassport((prev) => prev + "-")
  //   }
  //   if (passport.length === 5) {
  //     setPassport((prev) => prev + " №")
  //   }
  // }, [passport])

  // useEffect(() => {
  //   if (insurance.length === 3 || insurance.length === 7 || insurance.length === 11) {
  //     setInsurance((prev) => prev + " ")
  //   }
  // }, [insurance])
  

  return (
    <ContentBlock
      className={`relative`}
      title={"СВЕДЕНИЯ ОБ УЧЕНИКЕ"}
      size='huge'>
      {child ? (
        <div className='text-2xl flex flex-col flex-wrap max-h-full gap-2'>
          <p className='flex items-center person-item-info'>
            <span> ФИО:</span>
            {child.surname} {child.name} {child.lastname}
          </p>
          <p className='person-item-info'>
            <span> Дата рождения:</span>
            {child?.birthDate?.split("-").reverse().join(".")}
          </p>
          <p className='person-item-info'>
            <span> Статус:</span>
            {child.is_student ? "Учащийся" : child.is_enrollee ? "Поступающий" : "Поступающий"}
          </p>
          <p className='person-item-info'>
            <span> Возраст:</span>
            <p className='text-primary'>
              {child.birthDate ? getAge(new Date(child.birthDate)) : "Неизвестно"}
            </p>
          </p>
          <div className='text-base absolute top-8 right-8 bg-base-neutral w-32 h-32 rounded-full flex items-center justify-center sidebar-profile-avatar'>
            {child.img ? (
              <>
                <img
                  className='profile-img'
                  src={`${import.meta.env.VITE_API_URL ?? 'http://localhost:7777'}/static/img/${child.img}`}
                  alt=''
                />
              </>
            ) : (
              <p>Фото</p>
            )}
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
              className='btn btn-primary text-white'>
              {" "}
              Заполнить анкету ученика{" "}
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
        <div className='modal-box min-w-[760px]'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm rounded-xl btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <div>
            <h3 className='text-3xl font-semibold mb-6 uppercase'> Анкета ученика </h3>
          </div>
          <div>
            <div className='flex flex-col items-start justify-start gap-2.5 h-[52vh]'>
              <ModalCollapse
                defaultOpen
                flow='column'
                className='bg-base-200'
                name='Child-info'
                title={
                  <ModalCollapseTitle isCompleted={firstBlock}>
                    Основная информация
                  </ModalCollapseTitle>
                }>
                <LabelInput
                  // ref={surnameRef}
                  required
                  label='Фамилия'
                  value={surname}
                  setValue={setSurname}
                  type='text'
                  placeholder='Фамилия*'
                  min={2}
                />
                <LabelInput
                  // ref={nameRef}
                  required
                  label='Имя'
                  value={name}
                  setValue={setName}
                  type='text'
                  placeholder='Имя*'
                  min={2}
                />
                <LabelInput
                  required
                  // ref={lastnameRef}
                  label='Отчество'
                  value={lastname}
                  setValue={setLastname}
                  type='text'
                  placeholder='Отчество (при наличии)'
                  min={2}
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
                <div className='flex items-center justify-between gap-2'>
                  <p className='w-full'>Фото 3*4</p>
                  <label
                    htmlFor='child-img-input'
                    className='w-full cursor-pointer pointer-events-auto'>
                    <p className='bg-base-neutral h-10 w-full rounded-lg flex items-center justify-center '>
                      {" "}
                      {img ? img.name : child?.img ? "Изменить" : "Выберите фото"}{" "}
                    </p>
                  </label>
                  <input
                    accept='image/webp, image/jpeg'
                    id='child-img-input'
                    onChange={(e) => setImg(e.target.files?.[0])}
                    type='file'
                    className='hidden'
                  />
                </div>
              </ModalCollapse>
              {/* <ModalCollapse
                className='bg-base-200'
                name='Child-info'
                title={<ModalCollapseTitle isCompleted={secondBlock}>Документы</ModalCollapseTitle>}
                flow='row'
                rows={2}
                cols={1}
                defaultOpen={false}>
                <LabelInput
                  // ref={passportRef}
                  min={13}
                  max={13}
                  required
                  label='Свидетельство о рождении*'
                  value={passport}
                  setValue={setPassport}
                  type='text'
                  placeholder='II-AA №000000'
                />
                <LabelInput
                  // ref={insuranceRef}
                  min={14}
                  max={14}
                  required
                  label='СНИЛС*'
                  value={insurance}
                  setValue={setInsurance}
                  type='text'
                  placeholder='000 000 000 00'
                />
              </ModalCollapse> */}
              <ModalCollapse
                className='bg-base-200'
                name='Child-info'
                cols={1}
                rows={2}
                flow='row'
                defaultOpen={false}
                title={
                  <ModalCollapseTitle isCompleted={thirdBlock}>
                    <span className='flex items-center justify-start gap-2'>
                      {"Контактная информация"}{" "}
                      <span
                        className='tooltip tooltip-info tooltip-right z-50'
                        data-tip='При наличии'>
                        <Info />
                      </span>{" "}
                    </span>
                  </ModalCollapseTitle>
                }>
                <LabelInput
                  // ref={emailRef}
                  label='Почта'
                  value={email}
                  setValue={setEmail}
                  type='email'
                  placeholder='email@example.com'
                />
                <LabelInput
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
            <span className='text-sm text-primary flex w-full items-center justify-center mb-4'>
              {" "}
              Вводите данные корректно, от этого напрямую зависит успешность поступления!{" "}
            </span>
            <div className='flex items-center justify-between'>
              <div>
                <button
                  onClick={resetStateToInitial}
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

export default ProfileChildBlock
