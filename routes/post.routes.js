const routes=require("express").Router()
const{getPost,getPostid,createPost,editPost,deletePost}=require("../controller/post.controler")
const upload=require("../utils/multer")

routes.get("/post",getPost)
routes.get("/post/:id",getPostid)
routes.post("/createpost",upload.single("image"),createPost)
routes.patch("/editpost",editPost)
routes.delete("/deletepost/:id",deletePost)

module.exports=routes