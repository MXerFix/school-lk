import ApiError from "src/error/error"

const verifyMiddleware = (req: any, res: any, next: any) => {
  try {
    console.log(req['user'])
    if (req.user.is_verified) {
      next()
    } else {
      throw ApiError.ForbiddenError("Not verified")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default verifyMiddleware
