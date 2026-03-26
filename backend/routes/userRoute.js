import express from "express"
import { login, logout, register } from "../controllers/userController.js"
import { verify } from "../controllers/userController.js"
import { reverify } from "../controllers/userController.js"

const router=express.Router()

router.post("/register",register)
router.post("/verify",verify)
router.post("/reverify",reverify)
router.post("/login",login)
router.post("/logout",logout)

export default router