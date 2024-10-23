const express = require('express')
const app = express();

app.use(express.json())
const {userRouter} = require('./routes/user')
const { default: mongoose } = require('mongoose');
//const{createAdminRouter} =require('./routes/admin')
//const{createCourseRoutes} =require('./routes/course');



app.use('./routes/user' , userRouter)
//app.use('/course',courseRouter)
console.log('entered the request ')

    
    app.listen(3000)
    console.log('listening on port 3000')




