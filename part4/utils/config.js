require('dotenv').config()
var mongoUrl = process.env.MONGODB_URI
if (process.env.NODE_ENV=== 'test') {
    mongoUrl = process.env.TEST_MONGODB_URI
}
const PORT = process.env.PORT
module.exports = {
    mongoUrl, 
    PORT
}