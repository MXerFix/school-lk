class ApiError extends Error {
  status: number
  errors: any[]

  constructor(status: number, message: string, errors: any[]) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized error", [])
  }

  static ForbiddenError(message: string) {
    return new ApiError(403, message, [])
  }

  static BadRequest(message: string, errors: any[]) {
    return new ApiError(400, message, errors)
  }
}

export default ApiError