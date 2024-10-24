const jwt = require('jsonwebtoken')
const JWT_SECRET = "hksdjfhalkl;dlfjk"


function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports = {
    userMiddleWare: userMiddleware,
    JWT_SECRET
    
}