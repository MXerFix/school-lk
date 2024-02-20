import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize"


export type DocumentType = {
  name: string
  description: string
  required: boolean
  type: string
  tags: string[]
  file?: string
  step_id?: number
  user_id: number
}

class Document extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare file: string
  declare type: string
  declare tags: string[]
  declare step_id: number
  declare required: boolean
}

Document.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  file: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.JSON
  },
  step_id: {
    type: DataTypes.INTEGER
  },
  required: {
    type: DataTypes.BOOLEAN
  }
},


{
  sequelize,
  modelName: "document"
})

export default Document