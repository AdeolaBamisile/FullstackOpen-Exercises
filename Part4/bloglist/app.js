const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MongoURL)

mongoose.connect(config.MongoURL, {family: 4}).then(() => {
    logger.info('connected to MongoDB')
}).catch(error => {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
