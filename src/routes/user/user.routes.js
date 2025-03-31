import express from "express"
import { createUser } from "./user.controller.js"

const userRoutes = express.Router()

userRoutes.post("/createUser", createUser)


export default userRoutes