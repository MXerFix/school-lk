import { useMemo } from "react"
import { ToastOptions } from "react-hot-toast"
import { create } from "zustand"

type ThemeType = "light" | "dark"

interface ThemeStoreInterface {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleTheme: () => void
}

const t: string = localStorage.getItem("theme") ?? "light"
const initTheme: ThemeType = t === "light" || t === "dark" ? t : "light"
document.documentElement.style.backgroundColor = initTheme === "light" ? "#FAFAFC" : "#27282e"

export const useThemeStore = create<ThemeStoreInterface>((set) => {
  return {
    theme: initTheme,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem("theme", theme)
      set(() => ({ theme: theme }))
    },
    toggleTheme: () => {
      set((state) => {
        document.documentElement.style.backgroundColor =
          state.theme === "light" ? "#27282e" : "#FAFAFC"
        localStorage.setItem("theme", state.theme === "light" ? "dark" : "light")
        return { theme: state.theme === "light" ? "dark" : "light" }
      })
    },
  }
})