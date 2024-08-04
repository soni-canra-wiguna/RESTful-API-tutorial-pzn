import express from "express"
import cors from "cors"
import { publicRouter } from "../route/public-api"
import { errorMiddleware } from "../middleware/error-widdleware"
import { apiRouter } from "../route/api"

export const web = express()
web.use(cors)
web.use(express.json())
web.use(publicRouter)
web.use(apiRouter)
web.use(errorMiddleware)
