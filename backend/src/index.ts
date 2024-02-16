import express, { Express } from "express"
import router from "./router/router"
import db, { sequelize } from "./db/db"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { configDotenv } from "dotenv"
import errorMiddleware from "./middleware/middleware.error"
import fileUpload from 'express-fileupload'
import('./db/models/models')
import path from 'path'

const app: Express = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(fileUpload())
configDotenv()

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

app.use("/static", express.static(path.resolve(__dirname, "../static")))
app.use("/static/img", express.static(path.resolve(__dirname, "../static/img")))
app.use("/", express.static(path.resolve(__dirname, "../dist")))
app.use("/api", router)
app.use(errorMiddleware)

const start = async () => {
  await db()
  app.listen(process.env.PORT, () => {
    console.log("App started on port " + process.env.PORT)
  })
}

start()
