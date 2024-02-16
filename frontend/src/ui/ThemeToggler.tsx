import { Moon, Sun } from "lucide-react"
import { useThemeStore } from "../store/store.theme"

import React from "react"
import classNames from "classnames"

type ThemeTogglerPropsType = {
  iconClassName?: string
  className?: string
  [key: string]: unknown
}

const ThemeToggler = (props: ThemeTogglerPropsType) => {
  const { toggleTheme, theme } = useThemeStore()
  const { className, iconClassName } = props
  const is_light = theme === "light"

  return (
    <button
      onClick={toggleTheme}
      className={classNames(` flex items-center justify-center relative`, className)}
      {...props}>
      <Sun
        className={`absolute w-6 h-6 transition opacity-0 ${is_light && " opacity-100 rotate-45 "} ${iconClassName} `}
      />
      <Moon
        className={`absolute w-6 h-6 transition -rotate-45 opacity-0 ${!is_light && "opacity-100 rotate-0"} ${iconClassName} `}
      />
    </button>
  )
}

export default ThemeToggler
