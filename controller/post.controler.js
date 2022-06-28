
const{PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()

const getPost=async(req,res)=>{
  try {
    const postData=await prisma.post.findMany({include:{user:true}})
    res.send(postData)
  } catch (error) {
    res.send(error.message)
  }
}

const getPostid=async(req,res)=>{
  try {
    const postData=await prisma.post.findMany({where:{id:parseInt(req.params.id)}})
    res.send(postData)
  } catch (error) {
    res.send(error.message)
  }
}

const createPost=async(req,res)=>{
  try {
    const{title,blog,userId}=req.body
    console.log(req.file)
    const img = req.file.filename
    // const images=req.file.map((elm)=>{return elm.path})
    await prisma.post.create({data:{title,blog,image:[img],userId:parseInt(userId)}})
    res.send("ok")
  } catch (error) {
    res.send(error.message)
  }
}


const editPost=async(req,res)=>{
  try {
    const{id,title,blog,image}=req.body
    await prisma.post.update({where:{id:parseInt(id)},data:{title,blog,image}})
    res.send("ok updated")
  } catch (error) {
    res.send(error.message)
  }
}

const deletePost=async(req,res)=>{
  try {
    await prisma.post.delete({where:{id:parseInt(req.params.id)}})
    res.send('post is deleted')
  } catch (error) {
    res.send(error.message)
  }
}
module.exports={getPost,getPostid,createPost,editPost,deletePost}