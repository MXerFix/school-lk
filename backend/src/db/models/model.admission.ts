import { sequelize } from "./../db"
import { DataTypes, Model } from "sequelize"
import User from "./model.user"

class Admission extends Model {
  declare id: number
  declare user_id: number
  declare step_1: {
    is_complete: boolean
    is_pending: boolean
    documents: string[]
  }
  declare step_2: {
    is_complete: boolean
    is_pending: boolean
    payment: string
    payment_status: "paid" | "not_paid" | "pending"
  }
  declare step_3: {
    is_complete: boolean
    is_pending: boolean
    interview_completed: number
    interview_index: number
    meta: {
      interview_1: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
      interview_2: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
      interview_3: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
    }
  }
  declare step_4: {
    is_complete: boolean
    is_pending: boolean
    documents: string[]
  }
  declare step_5: {
    is_complete: boolean
    is_pending: boolean
    payment: string
    payment_status: "paid" | "not_paid" | "pending"
  }
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
    step_1: {
      type: DataTypes.JSON,
    },
    step_2: {
      type: DataTypes.JSON,
    },
    step_3: {
      type: DataTypes.JSON,
    },
    step_4: {
      type: DataTypes.JSON,
    },
    step_5: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "admission",
  }
)

Admission.belongsTo(User, { foreignKey: "user_id" })

export default Admission
