import { create } from "zustand"

export type PersonType = {
  id: number
  name: string
  surname: string
  lastname?: string
  birthDate: string
  gender: "male" | "female"
  citizenship?: string
  user_id?: number
}

export interface ChildType extends PersonType {
  insurance: string
  passport: string
  img: string
  email?: string
  tel?: string
  is_student?: boolean
  is_enrollee?: boolean
  parent_id?: number[]
  grade_index?: number
  grade_id?: number
  section_ids?: number[]
}

export interface ChildCreateType {
  name: string
  surname: string
  lastname?: string
  birthDate: string
  img: File
  gender: string
  passport: string
  insurance: string
  email?: string
  tel?: string
}

export type ChildCreateResponseType = {
  message: string
  child: ChildType
}

type ChildStoreType = {
  child: ChildType | null
  setChild: (child: ChildType) => void
}

export const useChildStore = create<ChildStoreType>((set) => ({
  child: null,
  setChild: (child) => set(() => ({ child: child })),
}))
