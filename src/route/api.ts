import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { UserController } from "../controller/user-controller"
import { ContactController } from "../controller/contact-controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// user API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

//contact API
apiRouter.post("/api/contacts", ContactController.create)
