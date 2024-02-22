import { createFileRoute, useRouterState } from "@tanstack/react-router"
import ContentBlock from "../../components/ContentBlock"
import { useChildStore } from "../../store/store.child"
import { useParentsStore } from "../../store/store.parents"
import { useUserStore } from "../../store/store.user"
import ProfileInfoItem from "../../ui/ProfileInfoItem"
import ProfileChildBlock from "../../components/Profile/ProfileChildBlock"
import ProfileParentBlock from "../../components/Profile/ProfileParentBlock"
import { useMemo, useState } from "react"
import { useUserTelChange } from "../../hooks/user/useUserTelChange"
import toast from "react-hot-toast"

const Profile = () => {
  const { parents } = useParentsStore()
  const { user } = useUserStore()

  const { changeUserTelFn } = useUserTelChange()

  const tel = useMemo(() => user?.tel, [user])
  const optionTels = useMemo(() => parents.map(({ tel }) => tel), [parents])
  const isTelChangeable = useMemo(() => parents.length <= 2, [parents])

  const onUserTelClick = async (option: string) => {
    if (option !== tel) {
      toast.loading("Сохранение...", {
        id: "change_user_tel",
      })
      changeUserTelFn(option)
    }
  }

  return (
    <div className='col-span-3 grid grid-cols-4 gap-12 pr-12'>
      <ProfileChildBlock />
      {parents.map((parent) => (
        <ProfileParentBlock
          key={parent.id}
          parent={parent}
        />
      ))}
      {parents.length < 2 && <ProfileParentBlock />}
      <ContentBlock
        className=''
        title='СВЕДЕНИЯ ОБ АККАУНТЕ'
        size='huge'>
        <div className='flex flex-col items-start justify-start gap-2'>
          <ProfileInfoItem
            title='Email'
            value={user?.email ?? "Не указан"}
          />
          <ProfileInfoItem
            onOptionClick={onUserTelClick}
            select={isTelChangeable}
            options={optionTels}
            title='Основной номер телефона'
            value={tel}
          />
          <div></div>
        </div>
      </ContentBlock>
    </div>
  )
}

export const Route = createFileRoute("/lk/profile")({
  component: Profile,
})
