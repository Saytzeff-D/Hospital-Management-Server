const express= require('express')
const userRouter=express.Router()
const userController= require('../controllers/user.controller')
userRouter.get('/',userController.getLandingPage)
userRouter.post('/signup',userController.postSignUp)



module.exports=userRouter