import { decode } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { Model } from "sequelize"
import Child from "src/db/models/model.child"
import User from "src/db/models/model.user"
import { ChildType, UserType } from "src/db/models/models.types"
import ApiError from "src/error/error"
import UserDTO from "src/dto/dto.user"
import { v4 } from "uuid"
import { pathToFileURL } from "bun"
import path from "path"
import { unlink } from "node:fs/promises"

class ChildController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        surname,
        lastname,
        birthDate,
        gender,
        citizenship,
        passport,
        insurance,
        email,
        tel,
      } = req.body
      // @ts-ignore
      const { img } = req.files // Assuming img is the field for the updated image
      const file_name = v4() + "." + img.mimetype.split("/")[1]
      img.mv(path.resolve(__dirname, "../../static/img", file_name))

      const user: UserDTO = req["user"]
      if (!name || !surname || !birthDate || !gender || !passport || !insurance || !img) {
        return next(
          ApiError.BadRequest(
            "Некорректные данные ребенка! Одно из обязательных полей не заполнено!",
            []
          )
        )
      }
      const _user = await User.findByPk<Model<UserType>>(user.id)
      if (!user) {
        return next(ApiError.BadRequest("Пользователя с таким id не существует!", []))
      }
      const _child = await Child.findOne<Model<ChildType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (_child) {
        return next(ApiError.BadRequest("У пользователя уже есть ребенок!", []))
      }
      const child = await Child.create<Model<ChildType>>({
        name,
        surname,
        lastname: lastname ?? "",
        birthDate,
        gender,
        passport,
        insurance,
        citizenship: citizenship ?? "РФ",
        is_enrollee: false,
        is_student: false,
        user_id: _user.dataValues.id,
        email: email ?? "",
        tel: tel ?? "",
        img: file_name,
      })
      return res.json({ message: "Данные о ребенке успешно добавлены!", child })
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserDTO = req["user"]
      const _user = await User.findByPk<Model<UserType>>(user.id)
      if (!user) {
        return next(ApiError.BadRequest("Пользователя с таким id не существует!", []))
      }
      const child = await Child.findOne<Model<ChildType>>({
        where: {
          user_id: _user.dataValues.id,
        },
      })
      if (!child) {
        return next(ApiError.BadRequest("Ребенок не найден!", []))
      }
      return res.json({ message: "Данные о ребенке успешно получены", child })
    } catch (error) {
      next(error)
    }
  }

  async mutate(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        surname,
        lastname,
        birthDate,
        gender,
        citizenship,
        is_enrollee = "empty",
        is_student = "empty",
        passport,
        insurance,
        email,
        tel,
      } = req.body
      console.log(req.body)

      const userData: UserDTO = req["user"]

      // @ts-ignore
      const { img } = req.files // Assuming img is the field for the updated image
      const file_name = v4() + "." + img.mimetype.split("/")[1]
      img.mv(path.resolve(__dirname, "../../static/img", file_name))

      // Perform the necessary mutation logic here using the received data
      const _user = await User.findByPk(userData.id, {
        include: Child,
      })
      const childId = _user.dataValues.child.id // Assuming you have the child's ID in the request parameters
      const child = await Child.findByPk<Model<ChildType>>(childId)

      if (!child) {
        return next(ApiError.BadRequest("Ребенок не найден!", []))
      }

      if (child.dataValues.img) {
        const oldImg = child.dataValues.img
        const oldImgPath = path.resolve(__dirname, "../../static/img", oldImg)
        await unlink(oldImgPath)
      }

      // Example: Update the child's information with the received data
      const updatedChild: Model<ChildType> = await Child.findOne<Model<ChildType>>({
        where: {
          id: childId,
        },
      })

      updatedChild.set({
        name,
        surname,
        lastname,
        birthDate,
        gender,
        citizenship,
        is_enrollee:
          is_enrollee === "empty" ? updatedChild.dataValues.is_enrollee : is_enrollee === "true",
        is_student:
          is_student === "empty" ? updatedChild.dataValues.is_student : is_student === "true",
        passport,
        insurance,
        email,
        tel,
        img: file_name,
      })

      await updatedChild.save()
      const newChild = await Child.findByPk<Model<ChildType>>(childId)
      console.log(newChild.dataValues)

      return res.json({ message: "Данные о ребенке успешно обновлены!", child: newChild })

      // Handle the result of the update operation
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default new ChildController()
