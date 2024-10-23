
const {Router}= require('express')
const userRouter = Router();
const bcrypt = require('bcrypt')
const {UserModel} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../userauth')







userRouter.post("/signup", async function(req,res,next){
 
    console.log(req.body)
    
   const {email,password,name} = req.body

    const sameuser = await UserModel.findOne({email}) //Checking Email is existing or not 

    if (sameuser){
        return res.json({
            message: "User Already Exist "
        })
    }
// Creating a model in database 

const hashedpassword = await bcrypt.hash(password, 5)

    await UserModel.create({  
        email: email,
        password: hashedpassword,
        name: name
    })

    return res.json({
        message:"User Signed Up !"
    })



})

userRouter.post('/login',async function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    })

      const passwordMatch = await bcrypt.compare(password,response.password)

      if(passwordMatch){
         const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);
       res.json ({
        token: token
       })

      } else{
        res.status(403).json({
            message:"Incorrect Creds"
        })
      }
})

userRouter.get('/purchase',function(req,res,next){
    
})

module.exports = {
     userRouter
}