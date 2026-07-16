const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find().populate('blogs', {title: 1, url: 1, author: 1})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter