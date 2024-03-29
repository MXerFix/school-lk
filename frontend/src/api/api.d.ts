export type UserDataLoginType = {
  username: string
  email: string
  id: number
  is_verified: boolean
  role_id: number
  profile_img?: string
}

export type UserLoginType = {
  accessToken: string
  refreshToken: string
  user: UserDataLoginType
}