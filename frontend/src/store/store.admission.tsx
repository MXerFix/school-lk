import { create } from "zustand"
import Cookies from "js-cookie"
import { useEffect } from "react"

export type AdmissionStepStatusType = "success" | "failed" | "pending" | "initial" | "closed" | "incorrect"

interface AdmissionStepInterface {
  id: number
  title?: string
  status?: AdmissionStepStatusType
}

export interface AdmissionStepUserInterface {
  id: number
  name: string
  step_index: number
  status: AdmissionStepStatusType
  title?: string
  description?: string
}

export interface AdmissionAPIInterface {
  id: number
  status: AdmissionStepStatusType
  step: number
  user_id: number
  steps?: AdmissionStepUserInterface[]
  documents?: unknown[]
  exams?: unknown[]
}

interface AdmissionStoreInterface {
  admission: AdmissionAPIInterface | null
  setAdmission: (admission: AdmissionAPIInterface | null) => void
  steps: AdmissionStepInterface[]
  setSteps: (steps: AdmissionStepInterface[]) => void
  setStepStatus: (step: number, status: AdmissionStepStatusType) => void
  setActiveStep: (step: number) => void
  activeStep: number
  reset: () => void
}


export const initSteps: AdmissionStepInterface[] = [
  {
    id: 0,
    status: "closed",
    title: "Приветствие",
  },
  {
    id: 1,
    status: "closed",
    title: "Документы",
  },
  {
    id: 2,
    status: "closed",
    title: "Оплата",
  },
  {
    id: 3,
    status: "closed",
    title: "Собеседования",
  },
  {
    id: 4,
    status: "closed",
    title: "Документы",
  },
  {
    id: 5,
    status: "closed",
    title: "Поступление",
  },
]

const initialState = {
  admission: null,
  steps: initSteps,
  activeStep: -2,
}

export const useAdmissionStore = create<AdmissionStoreInterface>((set) => {
  

  return {
    admission: null,
    setAdmission: (admission) => set({ admission }),
    steps: initSteps,
    setSteps: (steps) => set({ steps }),
    setStepStatus: (step: number, status: AdmissionStepStatusType) =>
      set((state) => ({
        steps: state.steps.map((s) => (s.id === step ? { ...s, status } : s)),
      })),
    setActiveStep: (step: number) =>
      set((state) => {
        return {
          steps: state.steps.map((s) => (s.id === step ? { ...s, status: "initial" } : s)),
          activeStep: step,
        }
      }),
    activeStep: -2,
    reset: () => set(initialState),
  }
})
