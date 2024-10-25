const {Router} = require('express')
const adminRouter = Router();
const { AdminModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const  { JWT_ADMIN_PASSWORD } = require("../config");
const {z} = require('zod')



adminRouter.post('/signUp',async function(req,res){
      
    const adreqbody = z.object({
        adminEmail: z.string().email(),
        adminName: z.string(),
        adminPassword: z.string().min(7).max(100)
    })

    const parseDatawithSuccess = adreqbody.safeParse(req.body);

    if(!parseDatawithSuccess){
        res.json({
            message: "Incorrect Format",
            error: parseDatawithSuccess.error.errors
        })
    }

    const adminEmail  = req.body.adminEmail
    const adminPassword = req.body.adminPassword
    const adminName = req.body.adminName

   const hashedadminPassword = await bcrypt.hash(adminPassword,5)
    
   await AdminModel.create({
       adminEmail: adminEmail,
       adminPassword: hashedadminPassword,
       adminName: adminName
   })
    return res.json({
        message:"Admin Signed Up !"
    })
})

adminRouter.post('/login',async function(req,res,next){

       const adminEmail = req.body.adminEmail
       const adminPassword = req.body.adminPassword

       const response = await AdminModel.findOne({
           adminEmail : adminEmail
       })

       const adminPasswordmatch = await bcrypt.compare (adminPassword,response.adminPassword)

       if(adminPasswordmatch){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_ADMIN_PASSWORD)
        
        res.json({
            token:token
        })

       }else{
        res.status(403).json({
            message:"Incorrect Creds"
        })
       }
    })

    module.exports={
        adminRouter: adminRouter
    }