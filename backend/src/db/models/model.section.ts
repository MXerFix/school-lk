import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

class Section extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare available_grades: string[]
  declare available_genders: string[]
  declare type: string
}

Section.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    available_grades: {
      type: DataTypes.JSON,
    },
    available_genders: {
      type: DataTypes.JSON,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "section",
  }
)

export default Section