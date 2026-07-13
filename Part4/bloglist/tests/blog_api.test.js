const Blog = require('../models/blog')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogList = [
    {
        title: 'Title 1',
        author: 'Erenn Johnson',
        url: 'url 1',
        likes: 5,
    },
    {
        title: 'title 2',
        author: 'Eran Danniels',
        url: 'url 2',
        likes: 15,
    },
    {
        title: 'title 3',
        author: 'Erenn Johnson',
        url: 'url 3',
        likes: 10,
    }
]

beforeEach(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(initialBlogList)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogList.length)
})

test('all blogs are returned')

after(async () => {
    mongoose.connection.close()
})