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
import Document from "./model.document"
import Exam from "./model.exam"
import Step from "./model.step"


User.belongsTo(Role, { foreignKey: "role_id" })
User.belongsTo(Grade, { foreignKey: "grade_id" })

User.hasOne(Token, { foreignKey: "user_id" })
User.hasOne(Child, { foreignKey: "user_id" })
User.hasMany(Parent, { foreignKey: "user_id" })

Child.belongsTo(User, { foreignKey: "user_id" })
Child.belongsTo(Grade, { foreignKey: "grade_id", as: "children" })

Child.hasMany(Parent, { foreignKey: "child_id" })

Parent.belongsTo(Child, { foreignKey: "child_id" })
Parent.belongsTo(User, { foreignKey: "user_id" })

Grade.hasMany(Child, { foreignKey: "grade_id" })

Token.belongsTo(User, { foreignKey: "user_id" })

Admission.belongsTo(User, { foreignKey: "user_id" })
User.hasOne(Admission, { foreignKey: "user_id" })

Admission.hasMany(Document, { foreignKey: "admission_id" })
Document.belongsTo(Admission, { foreignKey: "admission_id" })

User.hasMany(Document, { foreignKey: "user_id" })
Document.belongsTo(User, { foreignKey: "user_id" })

Admission.hasMany(Exam, { foreignKey: "admission_id" })
Exam.belongsTo(Admission, { foreignKey: "admission_id" })

User.hasMany(Exam, { foreignKey: "user_id" })
Exam.belongsTo(User, { foreignKey: "user_id" })

Admission.hasMany(Step, { foreignKey: "admission_id" })
Step.belongsTo(Admission, { foreignKey: "admission_id" })

Step.hasMany(Document, { foreignKey: "step_id" })
Document.belongsTo(Step, { foreignKey: "step_id" })


export default {
  User,
  Child,
  Parent,
  Role,
  Admission,
  Grade,
  Section,
  Project,
  Token,
  Step,
  Document,
  Exam
}
