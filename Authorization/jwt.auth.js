const jwt=require("jsonwebtoken")

const genratToken=(id)=>{
  return jwt.sign({id},"shubham")
}

const  verifyToken=async(req,res,next)=>{
  const{token}=req.body
  try {
    if(!token){
      return res.send(`Enter token`)
    }
    const {id}=jwt.verify(token,"shubham")
    req.id=parseInt(id)
    next()
  } catch (error) {
    res.send(error.message)
  }
}
const getUserId=async(req,res)=>{
  const{token}=req.body
  try {
    console.log(token)
  const {id}=jwt.verify(token,"shubham")
  console.log(id)
  res.status(200).json({id})
  } catch (error) {
    res.send(error.message)
  }

}
module.exports={genratToken,verifyToken,getUserId}