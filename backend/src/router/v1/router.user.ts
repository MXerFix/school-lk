import { Router } from "express";
import UserController from "../../controller/controller.user";
import ChildController from '../../controller/controller.child'
import authMiddleware from "src/middleware/middleware.auth";
import ParentController from "../../controller/controller.parent";

const user_router = Router()


user_router.get('/activate/:link', UserController.activate)
user_router.get('/children', authMiddleware, ChildController.get)
user_router.post('/children', authMiddleware, ChildController.create)
user_router.put('/children', authMiddleware, ChildController.mutate)

user_router.get('/parents', authMiddleware, ParentController.get)
user_router.post('/parents', authMiddleware, ParentController.create)


export default user_router