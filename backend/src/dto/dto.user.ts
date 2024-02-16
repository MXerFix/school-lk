import { Model } from "sequelize"
import { UserType } from "src/db/models/models.types"

class UserDTO {
  username: string
  email: string
  id: number
  is_verified: boolean
  role_id: number
  profile_img: string

  constructor(model: UserType) {
    this.username = model.username
    this.email = model.email
    this.id = model.id
    this.is_verified = model.is_verified
    this.role_id = model.role_id
    this.profile_img = model.profile_img
  }
}

export default UserDTO
