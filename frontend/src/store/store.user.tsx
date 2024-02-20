import { create } from "zustand"
import { UserDataLoginType } from "../api/api"



interface UserStoreInterface {
  user: UserDataLoginType | null
  setUser: (user: UserDataLoginType) => void
  is_login: boolean
  setIsLogin: (value: boolean) => void
  reset: () => void
}

export const initUser: UserDataLoginType = {
  id: 0,
  username: 'useremail@email.com',
  email: 'useremail@email.com',
  is_verified: false,
  role_id: 3
}

const initialState = {
  user: null,
  is_login: false
}


export const useUserStore = create<UserStoreInterface>((set) => ({
  user: null,
  setUser: ( user: UserDataLoginType ) => set(() => ({ user: user })),
  is_login: false,
  setIsLogin: (value: boolean) => set(() => ({ is_login: value })),
  reset: () => set(initialState),
}))
