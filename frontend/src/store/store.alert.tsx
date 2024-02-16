import { create } from "zustand"

type AlertType = {
  title: string
  description: string
  type: "error" | "warning" | "info" | "success"
  timestamp: number
}

interface AlertStoreInterface {
  alerts: AlertType[]
  setNewAlert: (alert: AlertType) => void
  deleteAlert: (alert: AlertType) => void
  clearAlerts: () => void
}

const initAlerts: AlertType[] = []

export const useThemeStore = create<AlertStoreInterface>((set) => ({
  alerts: initAlerts,
  setNewAlert: (alert: AlertType) => {
    set((state) => {
      localStorage.setItem("alerts", JSON.stringify([...state.alerts, alert]))
      return { alerts: [...state.alerts, alert] }
    })
  },
  deleteAlert: (alert: AlertType) => {
    set((state) => {
      const local_alerts: AlertType[] | null = JSON.parse(localStorage.getItem("alerts") ?? "")
      const filtered_local_alerts = local_alerts?.filter((a) => a.timestamp !== alert.timestamp)
      localStorage.setItem("alerts", JSON.stringify(filtered_local_alerts))
      return { alerts: [...state.alerts.filter((a) => a.timestamp !== alert.timestamp)] }
    })
  },
  clearAlerts: () => {
    set(() => ({ alerts: [] }))
  }
}))
