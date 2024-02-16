import { Model } from "sequelize"
import { UserType } from "src/db/models/models.types"
import UserDTO from "src/dto/dto.user"
import serviceToken from "src/service/service.token"
import serviceMail from "src/service/service.mail"

const createUserDTO = async (user: Model<UserType>) => {
  const user_dto = new UserDTO(user.dataValues)
  const tokens = await serviceToken.generateTokens({ ...user_dto })
  await serviceToken.saveToken({ ...user_dto }, tokens.refreshToken)
  return {
    ...tokens,
    user: user_dto,
  }
}

export default createUserDTO
