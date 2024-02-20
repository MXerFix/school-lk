import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize"
import { AdmissionStepStatusType } from "./models.types"


class Exam extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare date: string
  declare time: string
  declare class: string
  declare status: AdmissionStepStatusType
  declare comments?: string
  declare points?: number
  declare max_points?: number
  declare min_points?: number
  declare exercises?: string
}

Exam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'initial'
    }
  },
  {
    sequelize,
    modelName: "exam"
  }
)

export default Exam