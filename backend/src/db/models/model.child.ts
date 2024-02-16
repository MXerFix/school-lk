import { DataTypes } from "sequelize"
import { sequelize } from "../db"
import { Person } from "./models.base"
import User from "./model.user"
import Parent from "./model.parent"
import Grade from "./model.grade"

class Child extends Person {
  declare passport: string
  declare insurance: string
  declare is_student: boolean
  declare is_enrollee: boolean
  declare img: string
  declare grade_index?: number
  declare grade_id?: number
  declare section_ids?: number[]
  declare email?: string
  declare tel?: string
}

Child.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    passport: {
      type: DataTypes.STRING,
    },
    insurance: {
      type: DataTypes.STRING,
    },
    is_student: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_enrollee: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    grade_index: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "child",
  }
)



export default Child
