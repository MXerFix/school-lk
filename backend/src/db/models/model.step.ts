

import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize"
import { AdmissionStepStatusType } from './models.types';


export type StepType = {
  id: number
  name: string
  title: string
  description: string
  status: AdmissionStepStatusType
  step_index: number
  user_id: number
  required_documents: number
  admission_id: number
}

class Step extends Model {
  declare id: number
  declare name: string
  declare title: string
  declare description: string
  declare status: AdmissionStepStatusType
  declare step_index: number
  declare user_id: number
  declare required_documents: number
  declare admission_id: number
}

Step.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  step_index: {
    type: DataTypes.INTEGER
  },
  required_documents: {
    type: DataTypes.INTEGER
  }
},


{
  sequelize,
  modelName: "step"
})

export default Step