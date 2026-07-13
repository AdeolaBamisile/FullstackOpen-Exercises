require('dotenv').config()

const MongoURL = process.env.NODE_ENV === "test" ? process.env.TESTMONGODB_URL : process.env.MONGODB_URL
const PORT = process.env.PORT

module.exports = { MongoURL, PORT }
