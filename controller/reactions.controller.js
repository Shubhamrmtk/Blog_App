const{PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()



const applyLike=async(req,res)=>{
  const {like=false,dislike=false,userId,postId}=req.body
  try {
    const reacts=await prisma.reactions.findMany({where:{userId:parseInt(userId),postId:parseInt(postId)}})
    console.log(reacts)
    if (reacts.length>0){
      const postData=await prisma.post.findFirst({where:{id:parseInt(postId)}})
      console.log(postData)
      const arr=postData.reactionId
      const index = arr.indexOf(parseInt(userId));
      arr.pop(index); // 2nd parameter means remove one item only
      
      await prisma.reactions.deleteMany({where:{userId:parseInt(userId),postId:parseInt(postId)}})
      // const reactionList=await prisma.reactions.findMany({where:{postId:parseInt(postId),like:true}})
      let l=await arr.length
      await prisma.post.updateMany({where:{id:parseInt(postId)},data:{likes:l,reactionId:arr}})
      res.send(`like count is ${l}`)
    }else{
      
      await prisma.reactions.create({data:{like,dislike,userId:parseInt(userId),postId:parseInt(postId)}})
      // const reactionList=prisma.reactions.findMany({where:{postId:parseInt(postId),}})
      // const count=reactionList.length
      const postData=await prisma.post.findFirst({where:{id:parseInt(postId)}})
      console.log(postData)
      const arr=postData.reactionId
      arr.push(parseInt(userId))


      await prisma.post.updateMany({where:{id:parseInt(postId)},data:{likes:arr.length,reactionId:arr}})
      res.send(`${arr.length}`)
    }
  } catch (error) {
    res.send(error.message)
  }
}

const getStatus=async(req,res)=>{
  try {
    console.log(req.body)
    const{userId,postId}=req.body
    const reactData=await prisma.reactions.findMany({where:{userId:parseInt(userId),postId:parseInt(postId)}})
    if(reactData.length>0){
      const abc=reactData[0]
      return res.send(abc)
    }
    res.send("no-reaction")
  } catch (error) {
    res.send(error.message)
  }
}



module.exports={applyLike,getStatus}