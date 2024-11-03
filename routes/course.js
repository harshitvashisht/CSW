const {Router} = require('express');
const {userMiddleWare}= require ('../Middleware/userauth')
const courseRouter = Router();
const { PurchaseModel, CourseModel} = require("../db")

courseRouter.post('/purchase',userMiddleWare, async function (req,res){
     const userId = req.userId;
     const courseId = req.body.courseId


     // check that user had paid the price or not 
     await PurchaseModel.create({

        userId,
        courseId
     })
     res.json({
        message:"You have successfully bougth the course "
     })

})


courseRouter.get('/preview', async function(req,res){

    const courses = await CourseModel.find({})

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}