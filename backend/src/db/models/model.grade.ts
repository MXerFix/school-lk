import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize";
import Child from './model.child';


class Grade extends Model {
  declare id: number
  declare index: number
  declare symbol: string
  declare index_symbol: string
  declare teacher_ids: number[]
  declare children_ids: number[]
}

Grade.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  index: {
    type: DataTypes.INTEGER,
  },
  symbol: {
    type: DataTypes.STRING,
  },
  index_symbol: {
    type: DataTypes.STRING,
    unique: 'index_symbol'
  }
},
{
  sequelize,
  modelName: "grade",
}
)

export default Grade