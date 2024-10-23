const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect ('mongodb+srv://Cluster18092:PJ4cLb9DRN4VnYDZ@cluster18092.kdf3zvm.mongodb.net/CSW')

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

const Course = new Schema ({
    courseName: String, 
    courseCode: String, 
    coursePrice: String
})


const Purchase = new Schema({
    purchaserEmail: String,
    purchaserName: String,
    coursePrice: String
})

const UserModel = mongoose.model('users',User);
const AdminModel = mongoose.model('admin',Admin);
const CourseModel = mongoose.model('course',Course);
const PurchaseModel = mongoose.model('purchase',Purchase);

module.exports = {
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel: CourseModel,
    PurchaseModel: PurchaseModel, 
}