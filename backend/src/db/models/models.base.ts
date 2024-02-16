import { Model } from "sequelize"


export class Person extends Model {
  declare id: number
  declare name: string
  declare lastname: string
  declare surname: string
  declare birthDate: string
  declare userId: number
  declare gender: 'male' | 'female'
  declare citizenship: string
}

// export class Step extends Model {
//   declare id: number
//   user_id: number
//   step_1: boolean
//   step_2: boolean
//   step_3: boolean
//   step_4: boolean
//   step_5: boolean
//   step_6: boolean
// }