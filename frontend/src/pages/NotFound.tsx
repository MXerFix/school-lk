import { Link } from "@tanstack/react-router"
import React from "react"
import { useThemeStore } from "../store/store.theme"

const NotFound = () => {
  const { theme } = useThemeStore()

  return (
    <div className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
      <div style={{
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        <h1 className='text-4xl font-bold'>Страница не найдена</h1>
        <p className=''> Кажется, вы попали на несуществующую страницу </p>
      </div>
      <Link
        to='/lk/home'
        className='btn btn-secondary p-2 rounded-lg'>
        {" "}
        Выйти на путь истинный{" "}
      </Link>
    </div>
  )
}

export default NotFound
