var nodemailer = require('nodemailer');
require('dotenv').config()

// console.log(env)


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

const sendMail=(email,otp)=>{
  var mailOptions = {
    from: 'Blogg App',
    to: email,
    subject: 'Blog app verification OTP',
    text: otp
  };
  
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  

}

module.exports={sendMail}