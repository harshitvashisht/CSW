const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lajfhajkdlk';

function userMiddleWare (req,res,next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,JWT_SECRET)
 if(!token){
    res.json({
        message: "Invalid Token"
    })
 }try{
    if(response){
        req.userId = response.id;
        next();
    }
    }catch(err){
        res.status(403).json({
            message: "Incorrect Creds"
        })
    }
 
}

module.exports = {
    userMiddleWare: userMiddleWare,
    JWT_SECRET
    
}