const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find().populate('blogs', {title: 1, url: 1, author: 1})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body

    if (!username || !password) {
        return response.status(400).json({
            error: 'Username or password field missing'
        })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: "Username and password must be at least 3 characters"
        })
    }

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