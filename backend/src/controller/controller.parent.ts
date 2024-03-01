import { NextFunction, Request, Response } from "express"
import { Model } from "sequelize"
import Child from "src/db/models/model.child"
import Parent from "src/db/models/model.parent"
import User from "src/db/models/model.user"
import { ChildType, ParentCreateType, ParentType, UserType } from "src/db/models/models.types"
import UserDTO from "src/dto/dto.user"
import ApiError from "src/error/error"
import createUserDTO from "src/helper/createUserDTO"

class ParentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parent_data: ParentCreateType = req.body
      const user: UserDTO = req["user"]
      if (
        !parent_data.name ||
        !parent_data.surname ||
        !parent_data.birthDate ||
        !parent_data.gender ||
        // !parent_data.snils ||
        !parent_data.email ||
        !parent_data.tel
      ) {
        return next(
          ApiError.BadRequest(
            "Некорректные данные родителя! Одно из обязательных полей не заполнено!",
            []
          )
        )
      }
      const passport = JSON.stringify({
        series: parent_data.passport_series ?? "",
        number: parent_data.passport_number ?? "",
        issue_date: parent_data.passport_date ?? "",
        issued_by: parent_data.passport_issuedBy ?? "",
        department: parent_data.passport_department ?? "",
        address: parent_data.passport_address ?? "",
        address_date: parent_data.passport_addressDate ?? "",
      })
      const _user = await User.findByPk<Model<UserType>>(user.id)
      if (!_user) {
        return next(ApiError.BadRequest("Пользователя с таким id не существует!", []))
      }
      const _child = await Child.findOne<Model<ChildType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (!_child) {
        return next(
          ApiError.BadRequest(
            "Пожалуйста, добавьте данные о поступающем, прежде чем добавлять родителя!",
            []
          )
        )
      }
      const _parents = await Parent.findAll<Model<ParentType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (_parents.length >= 2) {
        return next(ApiError.BadRequest("Максимальное количество родителей - 2!", []))
      }
      if (
        _parents.some((parent) => parent.dataValues.relation_type === "father") &&
        parent_data.gender === "male"
      ) {
        return next(ApiError.BadRequest("У ребенка не может быть двух отцов!", []))
      }
      if (
        _parents.some((parent) => parent.dataValues.relation_type === "mother") &&
        parent_data.gender === "female"
      ) {
        return next(ApiError.BadRequest("У ребенка не может быть двух матерей!", []))
      }
      const parent = await Parent.create<Model<ParentType>>({
        name: parent_data.name,
        surname: parent_data.surname,
        lastname: parent_data.lastname,
        birthDate: parent_data.birthDate,
        gender: parent_data.gender,
        // passport: passport,
        // snils: parent_data.snils,
        email: parent_data.email,
        tel: parent_data.tel,
        relation_type: parent_data.gender === "female" ? "mother" : "father",
        user_id: _user.dataValues.id,
        child_id: _child.dataValues.id,
      })
      // console.log(parent)
      const parents = await Parent.findAll<Model<ParentType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (!_user.dataValues.tel) {
        _user.set({
          tel: parent_data.tel,
        })
        await _user.save()
      }
      return res.json({
        message: "Данные о родителе успешно добавлены!",
        parents,
        user: new UserDTO(_user.dataValues),
      })
    } catch (error) {
      next(error)
      console.log(error)
    }
  }

  async mutate(req: Request, res: Response, next: NextFunction) {
    try {
      const parent_data: ParentCreateType = req.body
      const user: UserDTO = req["user"]
      if (
        !parent_data.name ||
        !parent_data.surname ||
        !parent_data.birthDate ||
        !parent_data.gender ||
        !parent_data.email ||
        !parent_data.tel
      ) {
        return next(
          ApiError.BadRequest(
            "Некорректные данные родителя! Одно из обязательных полей не заполнено!",
            []
          )
        )
      }
      const _user = await User.findByPk<Model<UserType>>(user.id)
      if (!_user) {
        return next(ApiError.BadRequest("Пользователя с таким id не существует!", []))
      }
      const _parent = await Parent.findOne<Model<ParentType>>({
        where: {
          id: parent_data.id,
        },
      })
      if (!_parent) {
        return next(
          ApiError.BadRequest(
            "Пожалуйста, добавьте данные о родителе, прежде чем обновлять его!",
            []
          )
        )
      }
      if (parent_data.gender !== _parent.dataValues.gender) {
        _parent.set({
          relation_type: parent_data.gender === "female" ? "mother" : "father",
        })
      }
      _parent.set({
        name: parent_data.name,
        surname: parent_data.surname,
        lastname: parent_data.lastname,
        birthDate: parent_data.birthDate,
        gender: parent_data.gender,
        email: parent_data.email,
        tel: parent_data.tel,
      })
      await _parent.save()
      const parents = await Parent.findAll<Model<ParentType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      return res.json({ message: "Данные о родителе успешно обновлены!", parents })
    } catch(error) {
      console.log(error)
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserDTO = req["user"]
      const _user = await User.findByPk<Model<UserType>>(user.id)
      if (!user) {
        throw ApiError.BadRequest("Пользователя с таким id не существует!", [])
      }
      const parents = await Parent.findAll<Model<ParentType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (!parents.length) {
        return res.json({ message: "Данные о родителях не получены", parents: [] })
      }

      return res.json({ message: "Данные о родителе успешно получены", parents })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default new ParentController()
