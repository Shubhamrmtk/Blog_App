const{PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient
const bcrypt=require("bcrypt")
const {genratToken}=require("../Authorization/jwt.auth")
var newOTP = require('otp-generators')
const {sendMail}=require("../Sevices/nodemaile")
const client=require("../Sevices/redis")





// -----------------------------------------------------------------------
const signIn=async(req,res)=>{
  const {name,email,password,conform_password,dp=""}=req.body
  // console.log(req.body)
  try {
    if(password==conform_password){
      const encrypted=await bcrypt.hash(password,8)
      await prisma.user.create({data:{email,name,password:encrypted,dp}})
     const otp=await newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false });
    //  console.log(otp)
     await client.setEx(`${email}-otp`,60,otp)
     await sendMail(email,otp)
     res.status(200).json({"res":"ok","otp":`${otp}`})


    }else{
      res.send(`password and conform password doesn't match`)
    }
  } catch (error) {
    res.send(error.message)
  }
}
// --------------------------------------------------------------------------
const getUser=async(req,res)=>{
  try {
    const userData=await prisma.user.findMany({})
    res.send(userData)

  } catch (error) {
    res.send(error.message)
    
  }
}
// ----------------------------------------------------------------------------
const login=async(req,res)=>{
  const {email,password}=req.body
  try {
    const userData=await prisma.user.findFirst({where:{email}})
    if(!userData){
      return res.send(`your accunt doen't exits`)
    }
    const decryped=await bcrypt.compare(password,userData.password)
    console.log(decryped)
    if(decryped){
      const token=await genratToken(userData.id)
      return res.send(token)

    }
    return res.send(`invalid password`)

  } catch (error) {
    
  }
}
// ------------------------------------------------------------
const verifyUser=async(req,res)=>{
  const{email,otp}=req.body
  try {
    const userData=await prisma.user.findFirst({where:{email}})
    if(!userData){
      return res.send(`Invalid email`)
    }
    const user_otp=await client.get(`${email}-otp`)
    if(user_otp==otp){
      await prisma.user.update({where:{id:userData.id},data:{verify:true}})
      res.send(`your verfied now`)
    }else{
      res.send(`Invalid otp`)
    }

  } catch (error) {
    res.send(error.message)
  }
}

const generateOtp=async(req,res)=>{
  try {
    const{email}=req.body
    const otp=await newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false });
    //  console.log(otp)
     await client.setEx(`${email}-otp`,60,otp)
    //  await sendMail(email,otp)
     res.send(`your otp is ${otp}`)
    
  } catch (error) {
    res.send(error.message)
  }
}


module.exports={getUser,signIn,login,verifyUser,generateOtp}