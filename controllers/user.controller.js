// const userModel = require("../model/user.model")
// const bcrypt= require('bcryptjs')
// const res = require("express/lib/response")
// const jwt=require('jsonwebtoken')
// const secret=process.env.JWT_SECRET
const getLandingPage=(req,res)=>{
res.send('hello world home page')
}


const postSignUp=(request,response)=>{
    response.send('postsignup')
}

module.exports={getLandingPage,postSignUp}