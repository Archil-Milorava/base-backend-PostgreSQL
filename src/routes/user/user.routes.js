import express from "express"
import { createUser, getCurrentUser, signIn, signOut } from "./user.controller.js"
import { protectRoute } from "../../middleware/protectRouteMiddleware.js"

const userRoutes = express.Router()

userRoutes.post("/signUp", createUser)
userRoutes.post("/signIn", signIn)
userRoutes.post("/signOut", signOut)
userRoutes.post("/currentUser", protectRoute, getCurrentUser)


export default userRoutes