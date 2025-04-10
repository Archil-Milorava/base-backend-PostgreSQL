import express from "express"
import { protectRoute } from "../../middleware/protectRouteMiddleware.js"
import { createUser, getCurrentUser, handleForgotPassword, handleResetPassword, signIn, signOut } from "./user.controller.js"

const userRoutes = express.Router()

userRoutes.post("/signUp", createUser)
userRoutes.post("/signIn", signIn)
userRoutes.post("/signOut", signOut)
userRoutes.get("/currentUser", protectRoute, getCurrentUser)
userRoutes.patch("/forgot-password", handleForgotPassword )
userRoutes.patch("/reset-password", handleResetPassword )


export default userRoutes