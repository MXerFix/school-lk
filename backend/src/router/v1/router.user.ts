import { Router } from "express";
import UserController from "../../controller/controller.user";
import ChildController from '../../controller/controller.child'
import authMiddleware from "src/middleware/middleware.auth";
import ParentController from "../../controller/controller.parent";
import AdmissionController from '../../controller/controller.admission'
import controllerDocument from "src/controller/controller.document";

const user_router = Router()


user_router.get('/children', ChildController.get)
user_router.post('/children', ChildController.create)
user_router.put('/children', ChildController.mutate)

user_router.get('/parents', ParentController.get)
user_router.post('/parents', ParentController.create)
user_router.put('/parents', ParentController.mutate)

user_router.get('/admission', AdmissionController.get)
user_router.post('/admission/step', AdmissionController.mutateStepStatus)

user_router.post('/admission/documents', controllerDocument.create)
user_router.get('/admission/documents', controllerDocument.getRequiredDocuments)

user_router.put('/tel', UserController.change_tel)


export default user_router