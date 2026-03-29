import express from "express"
import { allUser, changePassword, forgotPassword, getUserById, login, logout, register, verifyOTP } from "../controllers/userController.js"
import { verify } from "../controllers/userController.js"
import { reverify } from "../controllers/userController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"

const router=express.Router()

router.post("/register",register)
router.post("/verify",verify)
router.post("/reverify",reverify)
router.post("/login",login)
router.post("/logout",isAuthenticated,logout)
router.post("/forgot-password",forgotPassword)
router.post("/verify-otp/:email",verifyOTP)
router.post("/change-password/:email",changePassword)
router.get("/all-user",isAuthenticated,isAdmin,allUser)
router.get("/get-user/:userId",getUserById)
export default router