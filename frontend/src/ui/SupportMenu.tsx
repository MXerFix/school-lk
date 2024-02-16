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
      <button
        className='p-2 hover:bg-base-200 w-10 h-10 rounded-md tooltip tooltip-top tooltip-info'
        data-tip='Помощь'>
        <HelpCircle className='' />
      </button>
    </div>
  )
}

export default SupportMenu
