import express, { Express } from "express"
import router from "./router/router"
import db, { sequelize } from "./db/db"
import cookieParser from "cookie-parser"
import cors from "cors"
import { configDotenv } from "dotenv"
import errorMiddleware from "./middleware/middleware.error"
import fileUpload from "express-fileupload"
import("./db/models/models")
import path from "path"
import authMiddleware from "./middleware/middleware.auth"
import { rateLimit } from "express-rate-limit"
import documentMiddleware from "./middleware/middleware.check-document-user"

const app: Express = express()

const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: async (req, res, next) => {
    return res.json({ message: "Слишком много запросов" })
  },
})

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.disable("x-powered-by")
app.use(fileUpload())
configDotenv()

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

app.use(limit)
app.use("/", express.static(path.resolve(__dirname, "../dist")))
app.use('/lk/*', express.static(path.resolve(__dirname, "../dist")))
app.use('/admin/*', express.static(path.resolve(__dirname, "../dist")))
app.use('/auth/*', express.static(path.resolve(__dirname, "../dist")))
app.use('/registration/*', express.static(path.resolve(__dirname, "../dist")))
app.use("/static", authMiddleware, express.static(path.resolve(__dirname, "../static")))
app.use("/static/img", authMiddleware, express.static(path.resolve(__dirname, "../static/img")))
app.use("/documents", authMiddleware, documentMiddleware, express.static(path.resolve(__dirname, "../documents")))
app.use("/api", router)
app.use(errorMiddleware)

const start = async () => {
  await db()
  app.listen(process.env.PORT, () => {
    console.log("App started on port " + process.env.PORT)
  })
}

start()
