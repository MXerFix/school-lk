import User from "src/db/models/model.user"
import serviceMail from "./service.mail"
import bcrypt from "bcrypt"
import { v4 } from "uuid"
import { UserType } from "src/db/models/models.types"
import { Model } from "sequelize"
import createUserDTO from "src/helper/createUserDTO"
import ApiError from "src/error/error"
import serviceToken from "./service.token"

class UserService {
  async signIn(email: string, password: string) {
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует!`, [])
    }
    const activation_link = v4()
    const hashed_password = await bcrypt.hash(password, 3)
    const user: User = await User.create({
      email,
      hashed_password,
      username: email,
      activation_link,
      is_verified: false,
    })
    if (user) {
      // await serviceMail.sendActivationMail(user.dataValues.email, user.dataValues.activation_link)
      const user_payload = await createUserDTO(user)
      return user_payload
    }
  }

  async login(email: string, password: string) {
    const candidate = await User.findOne({ where: { email } })
    if (!candidate) {
      throw ApiError.BadRequest(`Пользователя с адресом ${email} не существует!`, [])
    }
    const isPasswordEquals = await bcrypt.compare(password, candidate.hashed_password)
    if (!isPasswordEquals) {
      throw ApiError.BadRequest(`Неверный пароль!`, [])
    }
    const user_payload = await createUserDTO(candidate)
    return user_payload
  }

  async logout(refresh_token: string) {
    const is_ok = await serviceToken.removeToken(refresh_token)
    return is_ok
  }

  async refresh(refresh_token: string) {
    if (!refresh_token) {
      throw ApiError.UnauthorizedError()
    }
    const userData = await serviceToken.validateRefreshToken(refresh_token)
    const tokenData = await serviceToken.findTokenInDB(refresh_token)
    if (!userData || !tokenData) {
      throw ApiError.UnauthorizedError()
    }
    console.log(userData)
    const user = await User.findByPk(userData.id)
    const user_payload = await createUserDTO(user)
    return user_payload
  }

}

export default new UserService()
