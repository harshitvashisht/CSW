const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const MONGO_URL = process.env.MONGO_URL
module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD,
    MONGO_URL
}