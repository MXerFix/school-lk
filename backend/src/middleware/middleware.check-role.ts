import ApiError from "src/error/error"


const checkRoleMiddleware = (role: string) => {
  return (req: any, res: any, next: any) => {
    if (req.user.role.name === role) {
      next()
    } else {
      throw ApiError.ForbiddenError('Forbidden')
    }
  }
}

export default checkRoleMiddleware