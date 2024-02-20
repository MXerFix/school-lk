import { NextFunction, Request, Response } from "express"
import Document from "src/db/models/model.document"
import User from "src/db/models/model.user"
import UserDTO from "src/dto/dto.user"
import ApiError from "src/error/error"
import serviceToken from "src/service/service.token"

const documentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.cookies
    const accessToken = access_token
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = await serviceToken.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    const user_no_doc = await User.findByPk(userData.id)
    if (user_no_doc.dataValues.role_id <= 2) {
      return next()
    }
    const user = await User.findByPk(userData.id, {
      include: [Document],
    })
    const user_documents = user.dataValues.documents.map((doc) => doc.dataValues)
    if (!user_documents) {
      return next(ApiError.UnauthorizedError())
    }
    const req_document = req.url.slice(1)
    const document = user_documents.find((doc) => doc.file == req_document)
    if (!document) {
      return next(ApiError.UnauthorizedError())
    }
    req['user'] = userData
    next()
  } catch (error) {
    throw ApiError.UnauthorizedError()
  }
}

export default documentMiddleware