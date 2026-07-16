const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany()
    const passwordHash = await bcrypt.hash('password', 10)
    const newUser = new User({
        username: 'NewUser1',
        name: 'Anewuser1',
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
        username: 'NewUser1',
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
        username: 'ANewUser',
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

test('creation fails with thee status code 401 if token is not provided', async () => {
    const allBlogsStart = await Blog.find()

    const newBlog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'newUrl',
        likes: '0'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const allBlogsEnd = await Blog.find()
    assert.strictEqual(allBlogsEnd.length, allBlogsStart.length)
})

test('creation fails with status code 401 if token is invalid', async () => {
    const allBlogsStart = await Blog.find()

    const newBlog = {
        title: 'newTitle',
        author: 'newAuthor',
        url: 'newUrl',
        likes: '0'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const allBlogsEnd = await Blog.find()
    assert.strictEqual(allBlogsEnd.length, allBlogsStart.length)
})

after(async () => {
    await mongoose.connection.close()
})