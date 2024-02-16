import { sequelize } from './../db';
import { DataTypes, Model } from "sequelize";
import User from './model.user';


class Role extends Model {
  declare id: number
  declare name: string
  declare permissions: string
}


Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    permissions: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "role",
  } 
)



export default Role