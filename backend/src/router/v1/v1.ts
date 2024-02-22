import { Router } from "express"
import user_router from "./router.user"
import UserController from "../../controller/controller.user"
import authMiddleware from "src/middleware/middleware.auth"
import { body } from "express-validator"
import verifyMiddleware from "src/middleware/middlaware.verified"

const router_v1 = Router()

router_v1.get("/", authMiddleware, (req, res) => {
  res.send("v1")
})

router_v1.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  UserController.signIn
)
router_v1.post("/login", UserController.login)
router_v1.post("/logout", UserController.logout)
router_v1.get("/refresh", UserController.refresh)
router_v1.get('/activate', UserController.activate)
router_v1.post('/activate', UserController.modal_activate)
router_v1.use("/user", authMiddleware, verifyMiddleware, user_router)

export default router_v1
