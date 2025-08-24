const express=require("express")
const router=express.Router()
const authMiddleWare=require("../middlewares/authMiddleWare")
const {userProfile,updateUserProfile, ForgetPassword} = require("../controllers/profile")
router.get("/profile",authMiddleWare,userProfile)
router.put("/updateProfile", authMiddleWare, updateUserProfile);
router.put("/ForgetPassword",ForgetPassword)
module.exports=router