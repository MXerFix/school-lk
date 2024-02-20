import { sequelize } from "./../db"
import { DataTypes, Model } from "sequelize"
import User from "./model.user"
import { AdmissionStepStatusType } from "./models.types"

class Admission extends Model {
  declare id: number
  declare user_id: number
  declare step: number
  declare step_statuses: AdmissionStepStatusType[]
  declare status: AdmissionStepStatusType
}

Admission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'initial'
    },
    step: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize,
    modelName: "admission",
  }
)


export default Admission
