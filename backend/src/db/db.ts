import { Sequelize } from "sequelize"
import models_init from "./models/models"

const is_dev = process.env.dev === "true"
console.log(is_dev)
const db_name = is_dev ? "school_lk" : process.env.DB_NAME
const db_user = is_dev ? "root" : process.env.DB_USER
const db_password = is_dev ? "Maks2347" : process.env.DB_PASSWORD
const db_host = is_dev ? "localhost" : process.env.DB_HOST

export const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: "mysql",
  port: 3306,
})

const db = async () => {
  if (sequelize) {
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      console.log("Connection has been established successfully.")
    } catch (error) {
      console.error("Unable to connect to the database:", error)
    }
  }
}

export default db
