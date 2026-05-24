require('dotenv').config()

const MongoURL = process.env.MONGODB_URL
const PORT = process.env.PORT

module.exports = { MongoURL, PORT }
