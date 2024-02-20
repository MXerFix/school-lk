import { relationType } from "./models.types"
import { DataTypes } from "sequelize"
import { sequelize } from "../db"
import { Person } from "./models.base"
import User from "./model.user"
import Child from "./model.child"

class Parent extends Person {
  declare email: string
  declare tel: string
  declare relation_type: relationType
  declare insurance: string
  declare snils: string
  declare passport: {
    series: string
    number: string
    issue_date: string
    issued_by: string
    department: string 
  }
  declare child_id: number
  declare user_id: number
}

Parent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    relation_type: {
      type: DataTypes.STRING,
    },
    insurance: {
      type: DataTypes.STRING,
      unique: 'insurance'
    },
    snils: {
      type: DataTypes.STRING,
      unique: 'snils'
    },
    passport: {
      type: DataTypes.JSON
    },
    tel: {
      type: DataTypes.STRING,
      unique: 'tel'
    },
    email: {
      type: DataTypes.STRING,
      unique: "email"
    }
  },
  {
    sequelize,
    modelName: "parent",
  }
)


export default Parent
