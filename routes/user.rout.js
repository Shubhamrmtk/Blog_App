const routes=require("express").Router()
const{signIn,getUser,login,verifyUser,generateOtp}=require('../controller/user.contoller')
const {verifyToken,getUserId}=require("../Authorization/jwt.auth")

routes.get("/user",verifyToken,getUser)
routes.post("/signin",signIn)
routes.post("/login",login)
routes.post("/verify",verifyUser)
routes.post("/getuserId",getUserId)
routes.post("generateotp",generateOtp)

module.exports=routes