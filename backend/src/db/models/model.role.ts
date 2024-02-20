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
      unique: 'role_name'
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



// Role.bulkCreate([
//   {
//     name: "root",
//     permissions: ["root", "admin", "user", "teacher"]
//   },
//   {
//     name: "admin",
//     permissions: ["admin", "user", "teacher"]
//   },
//   {
//     name: 'teacher',
//     permissions: ["teacher", "user"]
//   },
//   {
//     name: "user",
//     permissions: ["user"]
//   }
// ])



export default Role