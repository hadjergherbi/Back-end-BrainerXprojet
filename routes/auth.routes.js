const express=require("express")
const router=express.Router()

const { SignUp, SignIn, Logout } = require("../controllers/auth")
router.post("/signUp",SignUp)
router.post("/SignIn",SignIn)
module.exports=router