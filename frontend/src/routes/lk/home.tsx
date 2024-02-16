import { createFileRoute } from "@tanstack/react-router"
import { useThemeStore } from "../../store/store.theme"
import { Bell, LogOut, Mail, Palette, ScrollText, Search, TestTube2 } from "lucide-react"
import ThemeToggler from "../../ui/ThemeToggler"
import ContentBlock from "../../components/ContentBlock"
import { useUserStore } from "../../store/store.user"

const Home = () => {

  const { user } = useUserStore()
  console.log(user)

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
          </div>
          {/* <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center'>
            <button className='btn btn-success'>Начать приемную кампанию</button>
          </div> */}
        </ContentBlock>
        <ContentBlock
          icon={<TestTube2 className="text-accent" />}
          title='Я-ИССЛЕДОВАТЕЛЬ'>
          <div className='flex flex-col items-start justify-end h-full pb-4'>
            <div className='skeleton w-full h-1/6 mb-3'></div>
            <div className='skeleton w-full h-4/6'></div>
          </div>
        </ContentBlock>
        <ContentBlock
          icon={<Palette className="text-primary" />}
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
