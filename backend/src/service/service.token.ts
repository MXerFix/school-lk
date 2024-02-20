import jwt, { JwtPayload } from "jsonwebtoken"
import Token from "src/db/models/model.token"
import UserDTO from "src/dto/dto.user"
import ApiError from "src/error/error"

class TokenService {
  async generateTokens(payload: UserDTO) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "15m",
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "7d",
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(user: UserDTO, refresh_token: string) {
    const tokenData = await Token.findOne({ where: { user_id: user.id } })
    if (tokenData) {
      tokenData.token = refresh_token
      return tokenData.save()
    }
    try {
      const token = await Token.create({
        user_id: user.id,
        token: refresh_token,
      })
      return token
    } catch (error) {
      console.log(error)
    }
  }

  async removeToken(refresh_token: string) {
    // console.log(refresh_token)
    const token = await Token.findOne({ where: { token: refresh_token } })
    if (!token) {
      throw ApiError.UnauthorizedError()
    }
    await token.destroy()
    await token.save()
    return true
  }

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS) as UserDTO
      return userData
    } catch (error) {
      return null
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH)
      return userData as JwtPayload
    } catch (error) {
      return null
    }
  }

  async findTokenInDB(token: string) {
    const tokenData = await Token.findOne({where: {token}})
    return tokenData
  }

}

export default new TokenService()
