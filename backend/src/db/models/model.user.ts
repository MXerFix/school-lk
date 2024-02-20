import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db"
import Child from "./model.child"
import Parent from "./model.parent"
import { AdmissionType, ChildType, ParentType } from "./models.types"
import Role from "./model.role"
import Grade from "./model.grade"



class User extends Model {
  declare id: number
  declare uuid: string
  declare username: string
  declare hashed_password: string
  declare email: string
  declare tel: string
  declare is_verified: boolean
  declare role_id: number
  declare profile_img: string
  declare activation_link?: string
  declare grade_id?: number
  declare admission?: AdmissionType
  declare child_id?: number
  declare parents_ids?: number[]
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: 'uuid'
    },
    username: {
      type: DataTypes.STRING,
    },
    hashed_password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: 'email'
    },
    tel: {
      type: DataTypes.STRING
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
    },
    profile_img: {
      type: DataTypes.STRING
    },
    activation_link: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
)


export default User