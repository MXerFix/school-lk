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
        secure: process.env.dev !== "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.dev !== "true",
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
        secure: process.env.dev !== "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.dev !== "true",
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
        secure: process.env.dev !== "true",
      })
      res.cookie("access_token", userData.accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: process.env.dev !== "true",
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
