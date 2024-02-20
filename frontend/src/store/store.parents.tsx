import { create } from "zustand"

export type PersonType = {
  id: number
  name: string
  lastname: string
  surname: string
  birthDate: string
  user_id: number
  gender: string
  citizenship: string
}

export type relationType = "mother" | "father" | "grandmother" | "grandfather" | "trustee"

export interface ParentType extends PersonType {
  relation_type: relationType
  passport: string
  insurance: string
  snils: string
  user_id: number
  child_id: number
  email: string
  tel: string
}

export interface ParentCreateType {
  name: string
  surname: string
  lastname?: string
  birthDate: string
  gender: string
  email: string
  tel: string
  snils: string
  passport_number: string
  passport_series: string
  passport_address: string
  passport_addressDate: string
  passport_date: string
  passport_department: string
  passport_issuedBy: string
}

export type ParentPassportType = {
  series: string
  number: string
  issue_date: string
  issued_by: string
  department: string
  address: string
  address_date: string
}

export type ParentCreateResponseType = {
  message: string
  parents: ParentType[]
}

type ParentStoreType = {
  parents: ParentType[]
  setParents: (parents: ParentType[]) => void
  addParent: (parent: ParentType) => void
  deleteParent: (parent: ParentType) => void
  reset: () => void
}

const initialState = {
  parents: []
}

export const useParentsStore = create<ParentStoreType>((set) => ({
  parents: [],
  setParents: (parents) => set(() => ({ parents: parents })),
  addParent: (parent) => set((state) => ({ parents: [...state.parents, parent] })),
  deleteParent: (parent) =>
    set((state) => ({ parents: [...state.parents.filter((p) => p.id !== parent.id)] })),
    reset: () => set(initialState),
}))
