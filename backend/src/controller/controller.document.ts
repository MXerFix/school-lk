import path from "path"
import { NextFunction, Request, Response } from "express"
import {
  Attributes,
  Model,
  ModelAttributeColumnOptions,
  ModelAttributes,
  ModelGetterOptions,
  ModelOptions,
  ModelStatic,
} from "sequelize"
import Document, { DocumentType } from "src/db/models/model.document"
import ApiError from "src/error/error"
import { v4 } from "uuid"
import { UserType } from "src/db/models/models.types"
import User from "src/db/models/model.user"
import Step, { StepType } from "src/db/models/model.step"
import Admission from "src/db/models/model.admission"

class DocumentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const { name, description, type, tags, step_index, required } = req.body
      // @ts-ignore
      const files = req.files
      const file = files?.file
      if (!file) {
        throw ApiError.BadRequest("Необходимо прикрепить документ!", [])
      }
      const file_name = v4() + "." + file.mimetype.split("/")[1]
      file.mv(path.resolve(__dirname, "../../documents", file_name))

      if (!name || !type || !tags || !step_index) {
        throw ApiError.BadRequest(
          "Некорректные данные документа! Одно из обязательных полей не заполнено!",
          []
        )
      }
      if (!user_dto) {
        throw ApiError.BadRequest("Пользователя с таким id не существует!", [])
      }

      const user = await User.findByPk<Model<UserType>>(user_dto.id)
      if (!user) {
        throw ApiError.BadRequest("Пользователя с таким id не существует!", [])
      }
      const admission = await Admission.findOne({
        where: {
          user_id: user.dataValues.id,
        },
        include: [Step],
      })
      if (!admission) {
        throw ApiError.BadRequest("Абитуриент не найден!", [])
      }
      const step = await Step.findOne<Model<Step>>({
        where: { step_index: step_index, admission_id: admission.dataValues.id },
      })
      if (!step) {
        throw ApiError.BadRequest("Шаг с таким индексом не существует!", [])
      }

      const document = await Document.create({
        name: name,
        description: description,
        type: type,
        tags: tags,
        file: file_name,
        step_id: step.dataValues.id,
        user_id: user.dataValues.id,
        required: required ? required : false,
      })
      if (!document) {
        throw ApiError.BadRequest("Не удалось создать документ!", [])
      }
      return res.json({ message: "Документ успешно создан" })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getRequiredDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { step_index, required } = req.query
      const user_dto = req["user"]
      if (!user_dto) {
        throw ApiError.BadRequest("Пользователя с таким id не существует!", [])
      }
      if (!step_index) {
        throw ApiError.BadRequest("Необходимо указать индекс шага!", [])
      }
      const user = await User.findByPk<Model<UserType>>(user_dto.id)
      if (!user) {
        throw ApiError.BadRequest("Пользователя с таким id не существует!", [])
      }
      const admission = await Admission.findOne({
        where: {
          user_id: user.dataValues.id,
        },
        include: [Step],
      })
      if (!admission) {
        throw ApiError.BadRequest("Абитуриент не найден!", [])
      }
      const step = await Step.findOne<Model<StepType>>({
        where: {
          step_index: Number(step_index),
          admission_id: admission.dataValues.id,
        },
      })
      if (!step) {
        throw ApiError.BadRequest("Шаг с таким индексом не существует!", [])
      }
      const documents = await Document.findAll({
        where: {
          user_id: user.dataValues.id,
          required: !!required,
          step_id: step.dataValues.id,
        },
      })
      if (!documents) {
        throw ApiError.BadRequest("Документы не найдены!", [])
      }
      if (documents.length < step.dataValues.required_documents) {
        throw ApiError.BadRequest("Прикреплены не все необходимые документы", [])
      }
      return res.json({ message: "Все необходимые документы прикреплены", docs: true })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const documents = await Document.findAll({
        where: {
          user_id: user_dto.id,
        },
      })
      return res.json({ documents })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default new DocumentController()
