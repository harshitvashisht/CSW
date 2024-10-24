const express = require('express')
const app = express();
const {userRouter} = require('./routes/user');
const { default: mongoose } = require('mongoose');

app.use(express.json())

mongoose.connect('mongodb+srv://Cluster18092:PJ4cLb9DRN4VnYDZ@cluster18092.kdf3zvm.mongodb.net/CSW', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

app.use('/user' , userRouter)


app.listen(3000)




