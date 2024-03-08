import e, { NextFunction, Request, Response } from "express"
import { Model } from "sequelize"
import { REQUIRED_DOCUMENTS } from "src/consts"
import Admission from "src/db/models/model.admission"
import Child from "src/db/models/model.child"
import Document from "src/db/models/model.document"
import Exam from "src/db/models/model.exam"
import Parent from "src/db/models/model.parent"
import Step, { StepType } from "src/db/models/model.step"
import User from "src/db/models/model.user"
import { AdmissionStepStatusType } from "src/db/models/models.types"
import ApiError from "src/error/error"

class AdmissionController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const admission = await Admission.findOne({
        where: {
          user_id: user_dto.id,
        },
        include: [Document, Exam, Step],
      })
      if (!admission) {
        throw ApiError.BadRequest("Абитуриент не найден!", [])
      }
      return res.json({ admission })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const admissions = await Admission.findAll({
        include: {
          model: User,
          include: [Child],
        }
      })
      if (!admissions) {
        throw ApiError.BadRequest("Заявления не найдены!", [])
      }
      return res.json({ admissions })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async mutateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const admission = await Admission.findOne({
        where: {
          user_id: user_dto.id,
        },
        include: [Document, Exam, Step],
      })
      if (!admission) {
        throw ApiError.BadRequest("Абитуриент не найден!", [])
      }
      const { status } = req.body as { status: AdmissionStepStatusType }
      await admission.update({ status })
      return res.json({ message: "Статус обновлен", admission })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async mutateStepStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user_dto = req["user"]
      const user = await User.findByPk(user_dto.id, {
        include: [Parent],
      })
      if (!user) {
        throw ApiError.BadRequest("Пользователь не найден!", [])
      }
      if (!user.dataValues.parents.length) {
        throw ApiError.BadRequest("Заполните анкету родителя!", [])
      }
      const admission = await Admission.findOne({
        where: {
          user_id: user_dto.id,
        },
        include: [Document, Exam, Step],
      })
      if (!admission) {
        throw ApiError.BadRequest("Абитуриент не найден!", [])
      }
      const { status, step_index } = req.body as {
        status: AdmissionStepStatusType
        step_index: number
      }
      const step = await Step.findOne({
        where: { admission_id: admission.dataValues.id, step_index },
      })
      if (!step) {
        throw ApiError.BadRequest("Шаг не найден!", [])
      }
      await step.update({ status })
      if (status !== "success") {
        if (status === "pending") {
          const _admission = await Admission.findOne({
            where: { id: admission.dataValues.id },
            include: [Step, Document, Exam],
          })
          return res.json({ message: "Статус шага обновлен", new_step: step, admission: _admission })
        }
        if (status === "failed") {
          await admission.update({ status: "failed" })
          return res.json({ message: "Статус шага обновлен", new_step: step, admission: admission })
        }
        if (status === "incorrect") {
          const _admission = await Admission.findOne({
            where: { id: admission.dataValues.id },
            include: [Step, Document, Exam],
          })
          return res.json({ message: "Статус шага обновлен", new_step: step, admission: _admission })
        }
      }
      await admission.update({ step: step_index + 1 })
      const new_step = await Step.create<Model<StepType>>({
        status: "initial",
        step_index: step_index + 1,
        admission_id: admission.dataValues.id,
        required_documents: REQUIRED_DOCUMENTS[step_index + 1],
      })
      const _admission = await Admission.findOne({
        where: { id: admission.dataValues.id },
        include: [Step, Document, Exam],
      })
      return res.json({ message: "Статус шага обновлен", admission: _admission, new_step })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default new AdmissionController()
