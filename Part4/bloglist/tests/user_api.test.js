const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany()
    const passwordHash = await bcrypt.hash('password', 10)
    const newUser = new User({
        username: 'New User',
        name: 'A new user',
        passwordHash
    })
    await newUser.save()
})

test('creation succeeds with fresh user', async () => {
    const allUsersStart = await User.find()

    const newUser = {
        username: 'Newuser',
        name: 'Anewuser',
        password: 'secret'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allUsersEnd = await User.find()
    const usernames = allUsersEnd.map(u => u.username)
    assert.strictEqual(allUsersEnd.length, allUsersStart.length + 1)
    assert(usernames.includes(newUser.username))
})

test('creation fails with status code 400 is username already exist', async () => {
    const allUsersStart = await User.find()
    
    const newUser = ({
        username: 'New User',
        name: 'ANewUser',
        password: 'secretive'
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const allUsersEnd = await User.find()
    assert.strictEqual(allUsersStart.length, allUsersEnd.length)
})

test('creation fails with status code 400 if password is too short', async () => {
    const allUsersStart = await User.find()

    const newUser = {
        username: 'A New User',
        name: 'ANewUser',
        password: 'se'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const allUsersEnd = await User.find()
    assert.strictEqual(allUsersEnd.length, allUsersStart.length)
})

test('creation fails with status code 400 if username is too short', async () => {
    const allUsersStart = await User.find()

    const newUser = {
        username: 'ne',
        name: 'ANewUser',
        password: 'Asecret'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const allUsersEnd = await User.find()
    assert.strictEqual(allUsersEnd.length, allUsersStart.length)
})

after(async () => {
    await mongoose.connection.close()
})