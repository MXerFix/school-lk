import classNames from "classnames"
import React from "react"
import ThemeToggler from "./ThemeToggler"
import { HelpCircle } from "lucide-react"

type SupportMenuType = {
  className: string
}

const SupportMenu = ({ className }: SupportMenuType) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-0.5 border border-base-content rounded-lg p-1",
        className
      )}>
      <ThemeToggler
        className='flex items-center justify-center p-2 hover:bg-base-200 w-10 h-10 rounded-md tooltip tooltip-top tooltip-info'
        data-tip='Тема'
      />
      <a
        href='https://t.me/mxerf_dev'
        target='_blank'
        className='p-2 hover:bg-base-200 w-10 h-10 rounded-md tooltip tooltip-top tooltip-info'
        data-tip='Помощь'>
        <HelpCircle className='' />
      </a>
    </div>
  )
}

export default SupportMenu
