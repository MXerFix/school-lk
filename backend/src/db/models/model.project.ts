import { SectionType } from './models.types';
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"
import Section from './model.section';
import Child from './model.child';

class Project extends Model {
  declare id: number
  declare name: string
  declare theme: string
  declare section_id: number
  declare child_id: number
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    theme: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "project",
  }
)

Project.belongsTo(Section, { foreignKey: "section_id" })
Project.belongsTo(Child, { foreignKey: "child_id" })

export default Project
