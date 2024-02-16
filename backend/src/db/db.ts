import { Sequelize } from "sequelize"
import models_init from "./models/models"

const is_dev = process.env.dev === "true"

export const sequelize = is_dev
  ? new Sequelize("school_lk", "root", "Maks2347", {
      host: "localhost",
      dialect: "mysql",
    })
  : new Sequelize("backend", "root", "root", {})

const db = async () => {
  if (sequelize) {
    try {
      await sequelize.authenticate()
      await sequelize.sync({ alter: true })
      console.log("Connection has been established successfully.")
    } catch (error) {
      console.error("Unable to connect to the database:", error)
    }
  }
}

export default db
