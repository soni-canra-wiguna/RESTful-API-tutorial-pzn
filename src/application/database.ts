import { PrismaClient } from "@prisma/client"
import { logger } from "./logger"

export const prisma = new PrismaClient({
  // log: ["error", "info", "query", "warn"] kita bisa pake yang default ini, tapi karena kita sudah setup logger(winston)
  log: [
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
})

// ketika ada event di prismanya dia bakal di kirim/ dimunculin pake looger
// mungkin secara default dia bakal muncul di console.log
prisma.$on("error", (e) => {
  logger.error(e)
})

prisma.$on("info", (e) => {
  logger.info(e)
})

prisma.$on("query", (e) => {
  logger.info(e)
})

prisma.$on("warn", (e) => {
  logger.warn(e)
})
