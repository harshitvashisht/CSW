require('dotenv').config()
const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect (process.env.MONGO_URL)

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const User = new Schema ({
    email: String,
    password: String,
    name: String,
})

const Admin = new Schema({
    adminName: String,
    adminEmail: String, 
    adminPassword: String

})

const CourseSchema = new Schema ({
   title: String,
   description: String,
   price: Number,
   imageUrl: String,
   creatorId: ObjectId

})


const PurchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const UserModel = mongoose.model('users',User);
const AdminModel = mongoose.model('admin',Admin);
const CourseModel = mongoose.model('course',CourseSchema);
const PurchaseModel = mongoose.model('purchase',PurchaseSchema);

module.exports = {
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel: CourseModel,
    PurchaseModel: PurchaseModel, 
}