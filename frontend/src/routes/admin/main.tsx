import { Link, createFileRoute } from "@tanstack/react-router"
import ContentBlock from "../../components/ContentBlock"

export const Route = createFileRoute("/admin/main")({
  component: AdminMain,
})

function AdminMain() {
  return (
    <div className='w-full col-span-3 grid grid-cols-4 gap-12'>
      <ContentBlock
        size='medium'
        title='Заявления'>
        <div className='w-full grid grid-cols-3 gap-4'>
          <Link to="/admin/list/admissions" className='content-block-admin-link'>
            Все
          </Link>
          <Link className='content-block-admin-link'>
            Активные
          </Link>
          <Link className='content-block-admin-link'>
            Закрытые
          </Link>
        </div>
      </ContentBlock>
      <ContentBlock size='medium' title='Пользователи'>
        <Link>
          
        </Link>
      </ContentBlock>
      <ContentBlock size='little'>
        <Link>
          <h3>Кружки</h3>
        </Link>
      </ContentBlock>
      <ContentBlock size='little'>
        <Link>
          <h3>Оплаты</h3>
        </Link>
      </ContentBlock>
      <ContentBlock size='little'>
        <Link>
          <h3>Исследователь</h3>
        </Link>
      </ContentBlock>
      <ContentBlock size='little'>
        <Link>
          <h3>Помощь</h3>
        </Link>
      </ContentBlock>
    </div>
  )
}
