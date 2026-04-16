import dotenv from "dotenv"

dotenv.config()

export const env = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
  dbName: process.env.DB_NAME || "contacts_db",
};