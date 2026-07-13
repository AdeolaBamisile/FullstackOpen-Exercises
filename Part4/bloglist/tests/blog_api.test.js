const Blog = require('../models/blog')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(helper.initialBlogList)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, helper.initialBlogList.length)
})

test('unique identifiers are named id', async () => {
    const response = await helper.blogsInDb()
    const firstBlog = response[0]
    assert.notStrictEqual(firstBlog.id, undefined)
    assert.strictEqual(firstBlog._id, undefined)
})

test('a new blog can be added', async () => {
    const newBlog = {
        title: 'Title 4',
        author: 'New Author',
        url: 'url 4',
        likes: 20,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const titles = allBlogs.map(b => b.title)
    assert.strictEqual(allBlogs.length, helper.initialBlogList.length + 1)
    assert(titles.includes('Title 4'))
})

test('there is a like property', async () => {
    const newBlog = {
        title: 'Title 4',
        author: 'New Author',
        url: 'url 4',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

})

test('there is no title', async () => {
    const newBlog = {
        author: 'New Author',
        url: 'url 4',
        likes: 20,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('there is on url', async () => {
    const newBlog = {
        title: 'Title 4',
        author: 'New Author',
        likes: 20,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})