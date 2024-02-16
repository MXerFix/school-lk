import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize";
import User from './model.user';


class Token extends Model {
  declare id: number
  declare user_id: number
  declare token: string
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING(1024),
    },
  },
  {
    sequelize,
    modelName: "token",
  }
)



export default Token