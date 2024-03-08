import { Router } from "express";
import AdmissionController from '../../controller/controller.admission'

const admin_router = Router()


admin_router.get('/admissions', AdmissionController.getAll)

export default admin_router