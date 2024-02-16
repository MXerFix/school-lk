import { DataTypes } from "sequelize"
import { sequelize } from "../db"
import User from "./model.user"
import Child from "./model.child"
import Parent from "./model.parent"
import Role from "./model.role"
import Admission from "./model.admission"
import Grade from "./model.grade"
import Section from "./model.section"
import Project from "./model.project"
import Token from "./model.token"


User.belongsTo(Role, { foreignKey: "role_id" })
User.belongsTo(Grade, { foreignKey: "grade_id" })

User.hasOne(Token, { foreignKey: "user_id" })
User.hasOne(Child, { foreignKey: "user_id" })
User.hasMany(Parent, { foreignKey: "user_id" })

Child.belongsTo(User, { foreignKey: "user_id" })
Child.belongsTo(Grade, { foreignKey: "grade_id", as: "children" })

Token.belongsTo(User, { foreignKey: "user_id" })


export default {
  User,
  Child,
  Parent,
  Role,
  Admission,
  Grade,
  Section,
  Project,
  Token
}
