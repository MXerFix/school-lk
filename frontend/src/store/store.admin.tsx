import { create } from "zustand"
import { AdmissionAPIInterface } from "./store.admission"
import { UserDataLoginType } from "../api/api"
import { ChildType } from "./store.child"

interface UserWithChildsInterface extends UserDataLoginType {
  child: ChildType
}

export interface AdmissionWithUserInterface extends AdmissionAPIInterface {
  user: UserWithChildsInterface
  createdAt: string
  updatedAt: string
}

type AdminStoreType = {
  users: []
  setUsers: (users: []) => void
  admissions: AdmissionWithUserInterface[]
  setAdmissions: (admissions: AdmissionWithUserInterface[]) => void
}


export const useAdminStore = create<AdminStoreType>((set) => {
  

  return ({
    admissions: [],
    setAdmissions: (admissions: AdmissionWithUserInterface[]) => set({ admissions }),
    users: [],
    setUsers: (users: []) => set({ users }),
  })
})
