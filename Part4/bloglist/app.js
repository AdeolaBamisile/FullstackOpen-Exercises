process.env.NODE_ENV !== 'production' && require('node:dns/promises').setServers(['8.8.8.8', '1.1.1.1'])
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

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
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
