import { Model } from "sequelize"
import Admission from "src/db/models/model.admission"
import Step from "src/db/models/model.step"

class AdmissionService {
  async getOne(id: number) {
    const admission = await Admission.findOne({ where: { id } })
    return admission
  }

  async create(user_id: number) {
    try {
      const admission = await Admission.create({
        status: "initial",
        step: -1,
        user_id,
      })
      const admission_id = admission.dataValues.id
      const _admission = await Admission.findOne({ where: { id: admission_id }, include: [Step] })
      return _admission
    } catch (error) {
      throw error
    }
  }
}

export default new AdmissionService()
