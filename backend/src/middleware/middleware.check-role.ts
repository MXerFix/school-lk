import Role from "src/db/models/model.role"
import User from "src/db/models/model.user"
import ApiError from "src/error/error"

const roles_ids = {
  1: 'root',
  2: 'admin',
  3: 'teacher',
  4: 'user'
}

const checkRoleMiddleware = (role: string) => {
  return async (req: any, res: any, next: any) => {
    const user_dto = req["user"]
    const _role = await Role.findOne({
      where: {
        name: role
      }
    })
    console.log(_role, role)
    if (!_role) {
      throw ApiError.BadRequest('Такой роли не существует', [])
    }
    const _user = await User.findByPk(user_dto.id)
    console.log(_role.dataValues.id, _user.dataValues.role_id)
    if (_role.dataValues.id >= _user.dataValues.role_id) {
      next()
    } else {
      return next(ApiError.ForbiddenError('Ошибка доступа'))
    }
  }
}

export default checkRoleMiddleware