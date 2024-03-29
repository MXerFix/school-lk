import { create } from "zustand"
import { UserDataLoginType } from "../api/api"



interface UserStoreInterface {
  user: UserDataLoginType
  setUser: (user: UserDataLoginType) => void
  is_login: boolean
  setIsLogin: (value: boolean) => void
}

export const initUser: UserDataLoginType = {
  id: 0,
  username: 'useremail@email.com',
  email: 'useremail@email.com',
  is_verified: false,
  role_id: 3
}


export const useUserStore = create<UserStoreInterface>((set) => ({
  user: initUser,
  setUser: ( user: UserDataLoginType ) => set(() => ({ user: user })),
  is_login: false,
  setIsLogin: (value: boolean) => set(() => ({ is_login: value }))
}))
