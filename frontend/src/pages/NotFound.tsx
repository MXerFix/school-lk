import { Link } from "@tanstack/react-router"
import React from "react"

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
      <div>
        <h1 className='text-4xl font-bold'>Страница не найдена</h1>
        <p> Кажется, вы попали на несуществующую страницу </p>
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
