import UserDTO from 'src/dto/dto.user';
import { NextFunction, Request, Response } from "express"
import Child from "src/db/models/model.child"
import Parent from "src/db/models/model.parent"
import User from "src/db/models/model.user"
import { ChildType } from "src/db/models/models.types"
import userService from "../service/service.user"
import ApiError from "src/error/error"
import { validationResult } from "express-validator"

class UserController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()))
      }
      const { email, password } = req.body
      if (!email || !password) {
        throw ApiError.BadRequest("Некорректный email или пароль", [])
      }
      const userData = await userService.signIn(email, password)
      res.cookie("refresh_token", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw ApiError.BadRequest("Некорректный email или пароль", [])
      }
      const userData = await userService.login(email, password)
      res.cookie("refresh_token", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.cookies
      const token = await userService.logout(refresh_token)
      if (token) {
        res.clearCookie("refresh_token").clearCookie("access_token").json({ message: "logout" })
      }
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.cookies
      const userData = await userService.refresh(refresh_token)
      res.cookie("refresh_token", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.SECURE_COOKIE === "true",
      })
      return res.json(userData)
    } catch (error) {
      res.clearCookie("refresh_token").clearCookie("access_token")
      next(error)
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { activation_link } = req.query
      console.log(activation_link)
      if (!activation_link) {
        throw ApiError.BadRequest("Некорректная ссылка активации!", [])
      }
      const correct_link = activation_link.toString()
      const user = await userService.activate(correct_link)
      return res.redirect(process.env.CLIENT_URL + "/lk/home?activated=true")
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async modal_activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { activation_link } = req.body
      if (!activation_link) {
        throw ApiError.BadRequest("Некорректная ссылка активации!", [])
      }
      const user = await userService.activate(activation_link)
      return res.json({message: "Активация прошла успешно", user: new UserDTO(user.dataValues)})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async change_tel(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findByPk(req["user"].id)
      if (!user) {
        throw ApiError.BadRequest("Пользователь не найден!", [])
      }
      const { tel } = req.body
      if (!tel) {
        throw ApiError.BadRequest("Некорректный телефон!", [])
      }
      await user.update({ tel })
      return res.json({ message: "Телефон успешно изменен", user })
    } catch (error) {}
  }
}

export default new UserController()
