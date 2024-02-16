import { createFileRoute, useRouterState } from "@tanstack/react-router"
import ContentBlock from "../../components/ContentBlock"
import { useChildStore } from "../../store/store.child"
import { useParentsStore } from "../../store/store.parents"
import { useUserStore } from "../../store/store.user"
import ProfileInfoItem from "../../ui/ProfileInfoItem"
import ProfileChildBlock from "../../components/Profile/ProfileChildBlock"
import ProfileParentBlock from "../../components/Profile/ProfileParentBlock"

const Profile = () => {
  const { parents } = useParentsStore()
  const { user } = useUserStore()

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
            value={user.email}
          />
          <ProfileInfoItem
            title='Основной номер телефона'
            value={"+79991112233"}
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
