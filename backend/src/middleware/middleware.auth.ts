import { NextFunction, Request, Response } from "express"
import ApiError from "src/error/error"
import serviceToken from "src/service/service.token"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.cookies
    // const authorizationHeader = req.headers.authorization
    // if (!authorizationHeader) {
    //   return next(ApiError.UnauthorizedError())
    // }
    // const accessToken = authorizationHeader.split(" ")[1]
    const accessToken = access_token
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = await serviceToken.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    req['user'] = userData
    next()
  } catch (error) {
    throw ApiError.UnauthorizedError()
  }
}

export default authMiddleware