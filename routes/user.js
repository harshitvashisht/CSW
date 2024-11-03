const {Router} = require('express')
const userRouter = Router();
const { UserModel , CourseModel, PurchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const  { JWT_SECRET, userMiddleWare } = require("../Middleware/userauth");



userRouter.post('/signUp', async function (req, res, next) {
    try {
        console.log('Request body:', req.body);  // Log request body

        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const sameuser = await UserModel.findOne({ email });

        if (sameuser) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        return res.json({
            message: "User Signed Up!"
        });

    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: "Server Error" });
    }
});


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



userRouter.get('/purchases',userMiddleWare, async function(req,res){
    const userId = req.userId;

    const purchases = await PurchaseModel.find({
        userId
    })
    res.json({
        purchases
    })
})

module.exports = {
     userRouter: userRouter
}