require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

function adminMiddleware(req,res,next){
      const token = req.headers.authorization;
      const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD)

      if (decoded){
        req.userId = decoded.id;
        next()
      }else{
        res.status(403).json({
            message: "You Are Not Signed In "
        })
      }
}

module.exports={
    adminMiddleware, 
    JWT_ADMIN_PASSWORD
    
}