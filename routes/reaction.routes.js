const routes=require("express").Router()
const{applyLike,getStatus}=require("../controller/reactions.controller")

routes.post("/like",applyLike)
routes.post("/getstatus",getStatus)

module.exports=routes