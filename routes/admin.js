const {Router} = require('express')
const adminRouter = Router();
const { AdminModel , CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const  { JWT_ADMIN_PASSWORD } = require("../config");
const {z} = require('zod');
const { adminMiddleware } = require('../Middleware/adminauth');



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


adminRouter.post('/course',adminMiddleware, async function (req,res){
    
    const adminId = req.userId
         
    const {title, description, imageurl, price  } = req.body;


   const course =  await CourseModel.create({

        title: title,
        description: description,
        price: price,
        imageUrl: imageurl,
        creatorId: adminId

    })

    res.json({
        message:"Course created",
        
        courseId: course._id,
     
       
    })


adminRouter.put('/course' ,adminMiddleware, async function(req,res){
      
    const adminId = req.userId
         
    const {title, description, imageurl, price ,courseId } = req.body;


    
   const course =  await CourseModel.updateOne({

        _id: courseId,
        creatorId: adminId
       
   }, {
      
        title: title,
        description: description,
        price: price,
        imageUrl: imageurl,
       

    })


    res.json({
        message:"Course Upadated",
        courseId: course._id
    })

})

adminRouter.get('/course/bulk',adminMiddleware, async function(req,res){
        
    const adminId = req.userId;

    const courses = await CourseModel.find({
        creatorId: adminId
    })
   
    res.json ({
        message: "Your All Courses !!",
        courses
    })


})


})
    module.exports={
        adminRouter: adminRouter
    }